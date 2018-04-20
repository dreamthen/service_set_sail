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
    getNewBonusesAction,
    changeNewBonusesIdAction
} from "../actions/main";

const Option = Select.Option;

class MainView extends React.Component {
    static propTypes = {
        //期号
        id: PropTypes.number,
        //列表
        bonusesList: PropTypes.array,
        //是否到八分钟刷新
        isFresh: PropTypes.bool,
        //服务器还剩多少时间
        time: PropTypes.number,
        //length服务器调用的次数
        count: PropTypes.string,
        //length服务器调用的次数
        graph_count: PropTypes.string
    };

    constructor(props) {
        super(props);
        const {
            //期号
            id,
            //列表
            bonusesList
        } = this.props;
        let bonusesList_last_ten_stage = bonusesList.slice(0, 10);
        this.state = {
            //期数向左禁用
            leftDisabled: id === bonusesList_last_ten_stage.length - 1,
            //期数向右禁用
            rightDisabled: !id
        };
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

    changeNewBonusesId(key, value, e) {
        const {
            bonusesList,
            changeNewBonusesIdHandler
        } = this.props;
        let index = 0,
            bonusesList_last_ten_stage = bonusesList.slice(0, 10);
        for (let [bonusesKey, bonusesValue] of bonusesList.entries()) {
            if (bonusesValue["id"] === value) {
                index = bonusesKey;
            }
        }
        if (index === 0) {
            this.setState({
                leftDisabled: false,
                rightDisabled: true
            });
        } else if (index === bonusesList_last_ten_stage.length - 1) {
            this.setState({
                leftDisabled: true,
                rightDisabled: false
            });
        } else {
            this.setState({
                leftDisabled: false,
                rightDisabled: false
            });
        }
        changeNewBonusesIdHandler.bind(this)(key, index);
    }

    changeNewBonusesIdPlusOrMinus(key, index, e) {
        const {
            bonusesList,
            changeNewBonusesIdHandler
        } = this.props;
        let bonusesList_last_ten_stage = bonusesList.slice(0, 10);
        if (index <= 0) {
            this.setState({
                rightDisabled: true
            }, () => {
                changeNewBonusesIdHandler.bind(this)(key, 0);
            });
            return null;
        }
        if (index >= bonusesList_last_ten_stage.length - 1) {
            this.setState({
                leftDisabled: true
            }, () => {
                changeNewBonusesIdHandler.bind(this)(key, bonusesList_last_ten_stage.length - 1);
            });
            return null;
        }
        this.setState({
            leftDisabled: false,
            rightDisabled: false
        }, () => {
            changeNewBonusesIdHandler.bind(this)(key, index);
        });
    }

    componentDidMount() {
        let socket = io(window.location.host);
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
            children,
            //length服务器调用的次数
            count,
            //length服务器调用的次数
            graph_count,
            //路由props
            router
        } = this.props;
        const {
            getNewBonusesHandler,
            getBonusesListHandler,
            changeNewBonusesId,
            changeNewBonusesIdPlusOrMinus
        } = this;
        const {
            //期数向左禁用
            leftDisabled,
            //期数向右禁用
            rightDisabled
        } = this.state;
        let newBonuses_id,
            newBonuses_select_id,
            newBonuses_arr,
            newBonuses_sum,
            newBonuses_sm_lge,
            newBonuses_odd_even,
            bonusesList_last_ten_stage = bonusesList.slice(0, 10);
        if (bonusesList.length > 0) {
            newBonuses_id = bonusesList[0]["no"];
            newBonuses_select_id = bonusesList[id]["no"];
            newBonuses_arr = bonusesList[id]["number"].split(",");
            newBonuses_sum = bonusesList[id]["sum"];
            newBonuses_sm_lge = bonusesList[id]["sm_lge"];
            newBonuses_odd_even = bonusesList[id]["odd_even"];
        }
        return (
            <main className="main-container">
                <header className="main-view-header">
                    <nav className="main-view-navigator">
                        <div className="main-view-nav-func main-view-nav-lastTenStage">
                            <img src="/images/ruishi_logo.png" alt="中国福利彩票Logo"/>
                            <div className="nav-lastTenStage">
                                <div>
                                    最新：<span style={{color: "#f00"}}>{newBonuses_id}</span>期
                                </div>
                                <i className={leftDisabled ? `iconfontSail iconSail-left iconSail-left-disabled` : `iconfontSail iconSail-left`}
                                   onClick={changeNewBonusesIdPlusOrMinus.bind(this, "id", id + 1)}
                                >

                                </i>
                                <i className={rightDisabled ? `iconfontSail iconSail-right iconSail-right-disabled` : `iconfontSail iconSail-right`}
                                   onClick={changeNewBonusesIdPlusOrMinus.bind(this, "id", id - 1)}
                                >

                                </i>
                                <Select
                                    className="main-view-select"
                                    size="default"
                                    style={{margin: "6px 0 0 0", width: 114}}
                                    value={newBonuses_select_id}
                                    onChange={changeNewBonusesId.bind(this, "id")}
                                >
                                    {
                                        bonusesList_last_ten_stage.map((bonusesItem, bonusesIndex) => {
                                            return (
                                                <Option
                                                    key={bonusesIndex}
                                                    value={bonusesItem["id"]}
                                                >
                                                    {bonusesItem["no"]}
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <img src="/images/ruishi.png" alt="中国福利彩票快三"/>
                        </div>
                        <div className="main-view-nav-func main-view-nav-awardResults">
                            {
                                newBonuses_arr && newBonuses_arr.length > 0 && newBonuses_arr.map((bonusesItem, bonusesIndex) => {
                                    return <span key={bonusesIndex}>
                                        <span
                                            className="main-view-nav-award">
                                            {bonusesItem}
                                        </span>
                                        {(bonusesIndex !== newBonuses_arr.length - 1) ? "+" : ""}
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
                            count={count ? count : graph_count}
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
                                        linkItem["to"] === router["location"]["pathname"] &&
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
        time,
        count
    } = state.prizeTableReducer;
    return {
        ...state.mainReducer,
        bonusesList,
        time,
        count
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
        },
        changeNewBonusesIdHandler(name, value) {
            dispatch(changeNewBonusesIdAction.bind(this)({name, value}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);