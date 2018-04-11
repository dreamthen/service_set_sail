import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Select} from "antd";
import {Link} from "react-router";
import {linkConfig} from "../configs/routesConfig";
import sizeConfig from "../configs/sizeConfig";
import {Timer} from "../components";
import io from "socket.io-client";
import {
    getNewBonuses,
    getNewBonusesAction
} from "../actions/main";

const Option = Select.Option;

class MainView extends React.Component {
    static propTypes = {
        //期号
        id: PropTypes.string,
        //列表
        bonusesList: PropTypes.array,
        //是否到八分钟刷新
        isFresh: PropTypes.bool,
        //服务器还剩多少时间
        time: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    //八分钟时间后，调用获取新的中奖数字接口
    getNewBonusesHandler(judgement) {
        const {
            //是否到八分钟刷新
            isFresh,
            getNewBonusesDispatch
        } = this.props;
        getNewBonusesDispatch.bind(this)(judgement, isFresh);
    }

    getBonusesListHandler() {
        const {
            getBonusesListDispatch
        } = this.props;
        getBonusesListDispatch.bind(this)(false);
    }

    componentDidMount() {
        let socket = io("http://116.62.65.162:7001");
        socket.on("connect", () => {
            console.log("server connect~");
        });
        socket.on("notify", (msg) => {
            const {
                getBonusesListDispatch
            } = this.props;
            getBonusesListDispatch.bind(this)(true);
        });
    }


    render() {
        const {
            //期号
            id,
            //列表
            bonusesList,
            //服务器还剩多少时间
            time,
            //子路由容器container
            children
        } = this.props;
        const {
            getNewBonusesHandler,
            getBonusesListHandler
        } = this;
        let newBonuses_arr,
            newBonuses_sum,
            newBonuses_sm_lge,
            newBonuses_odd_even;
        if (bonusesList.length > 0) {
            newBonuses_arr = bonusesList[0]["number"].split(",");
            newBonuses_sum = bonusesList[0]["sum"];
            newBonuses_sm_lge = bonusesList[0]["sm_lge"];
            newBonuses_odd_even = bonusesList[0]["odd_even"];
        }
        return (
            <main className="main-container">
                <header className="main-view-header">
                    <nav className="main-view-navigator">
                        <div className="main-view-nav-func main-view-nav-lastTenStage">
                            <img src="/images/ruishi_logo.png" alt="中国福利彩票Logo"/>
                            <div className="nav-lastTenStage">
                                <div>
                                    最新：<span style={{color: "#f00"}}>{id}</span>期
                                </div>
                                <Select>

                                </Select>
                            </div>
                            <img src="/images/ruishi.png" alt="中国福利彩票快三"/>
                        </div>
                        <div className="main-view-nav-func main-view-nav-awardResults">
                            {
                                newBonuses_arr && newBonuses_arr.length > 0 && newBonuses_arr.map((bonusesItem, bonusesIndex) => {
                                    return <span
                                        key={bonusesIndex}
                                        className="main-view-nav-award">
                                        {bonusesItem}
                                    </span>
                                })
                            }
                            和值
                            <span className="main-view-nav-award main-view-nav-award-sum">
                                {newBonuses_sum}
                            </span>
                            <hr className="main-view-nav-award-hr"/>
                            <span className="main-view-nav-award main-view-nav-transform">
                                {sizeConfig[newBonuses_sm_lge]}
                            </span>
                            <span className="main-view-nav-award main-view-nav-transform">
                                {sizeConfig[newBonuses_odd_even]}
                            </span>
                        </div>
                        <div className="main-view-nav-func main-view-nav-timer">
                            下一期：<Timer
                            wrapClassName="main-view-nav-timer-container"
                            type="m"
                            start="12:00:00"
                            end="00:30:00"
                            surplus={time * 1000}
                            duration={8}
                            done={getNewBonusesHandler.bind(this)}
                            changeRefresh={getBonusesListHandler.bind(this)}
                        />
                        </div>
                    </nav>
                </header>
                <section className="main-view-section">
                    <div className="main-view-link-container">
                        {
                            linkConfig.map((linkItem, linkIndex) => {
                                return <Link
                                    to={linkItem["to"]}
                                    className="main-view-link"
                                    activeClassName="main-view-link-active"
                                    key={linkIndex}
                                    onClick={(e) => {
                                        linkItem["active"] = true;
                                    }}
                                >
                                    {linkItem["content"]}
                                    {
                                        linkItem["active"] &&
                                        <div className="main-view-link-active-icon" style={{borderTopColor: "#355395"}}>

                                        </div>
                                    }
                                </Link>
                            })
                        }
                    </div>
                    <div className="main-view-section-branch">
                        {children}
                    </div>
                </section>
            </main>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let {
        bonusesList,
        time
    } = state.prizeTableReducer;
    return {
        ...state.mainReducer,
        bonusesList,
        time
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getNewBonusesDispatch(judgement, isFresh) {
            if (!isFresh && judgement) {
                getNewBonuses.bind(this)().then(function resolve() {
                    dispatch(getNewBonusesAction.bind(this)(judgement));
                }.bind(this), function reject() {

                }.bind(this));
            } else if (isFresh && !judgement) {
                dispatch(getNewBonusesAction.bind(this)(judgement));
            }
        },
        getBonusesListDispatch(judgement) {
            dispatch(getNewBonusesAction.bind(this)(judgement));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);