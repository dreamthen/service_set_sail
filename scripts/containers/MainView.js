import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Select} from "antd";
import {Timer} from "../components";

const Option = Select.Option;

class MainView extends React.Component {
    static propTypes = {
        //期号
        id: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            //期号
            id
        } = this.props;
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

                        </div>
                        <div className="main-view-nav-func main-view-nav-timer">
                            下一期：<Timer type="m" start="12:00:00" end="00:30:00" duration={8} />
                        </div>
                    </nav>
                </header>
            </main>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...state.mainReducer
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);