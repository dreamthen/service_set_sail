import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Input, InputNumber, message} from "antd";
import stateConfig from "../configs/stateConfig";
import {setNewBonuses, setNewBonusesAction} from "../actions/background";

class BackgroundView extends React.Component {
    static propTypes = {
        //设置下次中奖的数字
        recommend: PropTypes.string
    };

    constructor(props) {
        super(props);
        let state = {},
            background_state = stateConfig["backgroundView"];
        for (let [key, value] of Object.entries(background_state)) {
            state[`recommend_${key}`] = value;
        }
        this.state = Object.assign({}, state, {
            username: "",
            password: "",
            isLogin: false
        });
    }

    onInputChangeHandler(key, e) {
        this.setState({
            [key]: e.target.value
        })
    }

    onInputNumberChangeHandler(key, value) {
        this.setState({
            [key]: value
        })
    }

    onLoginCheck() {
        const {
            username,
            password
        } = this.state;
        let username_true = "admin",
            password_true = "66668888";
        if (!username) {
            message.warning("用户名不能为空");
            return false;
        }
        if (username !== username_true) {
            message.warning("用户名输入错误");
            return false;
        }
        if (!password) {
            message.warning("密码不能为空");
            return false;
        }
        if (password !== password_true) {
            message.warning("密码输入错误");
            return false;
        }
        return true;
    }

    onLoginButtonClickHandler() {
        const {
            onLoginCheck
        } = this;
        if (onLoginCheck.bind(this)()) {
            this.setState({
                isLogin: true
            });
        }
    }

    onSetUpButtonClickHandler() {
        const {
            onSetUpHandler
        } = this.props;
        let background_state = stateConfig["backgroundView"],
            recommend = [];
        for (let key of Object.keys(background_state)) {
            recommend = [...recommend, this.state[`recommend_${key}`]];
        }
        onSetUpHandler.bind(this)(recommend.join(","));
    }


    render() {
        const {
            username,
            password,
            isLogin
        } = this.state;
        const {
            onInputChangeHandler,
            onInputNumberChangeHandler,
            onLoginButtonClickHandler,
            onSetUpButtonClickHandler
        } = this;
        let recommend_arr = [];
        for (let [key, value] of Object.entries(stateConfig["backgroundView"])) {
            recommend_arr = [...recommend_arr, key];
        }
        return (
            <section className="background-main-view">
                {
                    isLogin ? <main className="background-main-setUp">
                        <div className="background-main-inputNumber-container">
                            {
                                recommend_arr.map((commendItem, commendIndex) => {
                                    return <InputNumber key={commendIndex}
                                                        className="background-main-inputNumber"
                                                        maxLength={1}
                                                        max={6}
                                                        min={1}
                                                        value={this.state[`recommend_${commendItem}`]}
                                                        onChange={onInputNumberChangeHandler.bind(this, `recommend_${commendItem}`)}/>
                                })
                            }
                        </div>
                        <div className="background-main-setUp-button-container">
                            <Button
                                size="large"
                                type="primary"
                                className="background-main-setUp-button"
                                onClick={onSetUpButtonClickHandler.bind(this)}
                            >
                                设置
                            </Button>
                        </div>
                    </main> : <main className="background-main-login">
                        <h2 className="background-main-login-title">登录</h2>
                        <div className="background-main-login-username">
                            <label htmlFor="username" className="background-main-login-label">
                                用户名：
                            </label>
                            <div className="background-main-login-input">
                                <Input
                                    id="username"
                                    size="large"
                                    type="text"
                                    value={username}
                                    style={{width: 200}}
                                    onChange={onInputChangeHandler.bind(this, "username")}
                                />
                            </div>
                        </div>
                        <div className="background-main-login-password">
                            <label htmlFor="password" className="background-main-login-label">
                                密 码：
                            </label>
                            <div className="background-main-login-input">
                                <Input
                                    id="password"
                                    size="large"
                                    type="password"
                                    value={password}
                                    style={{width: 200}}
                                    onChange={onInputChangeHandler.bind(this, "password")}
                                />
                            </div>
                        </div>
                        <div className="background-main-login-button-container">
                            <Button
                                size="large"
                                type="primary"
                                className="background-main-login-button"
                                onClick={onLoginButtonClickHandler.bind(this)}
                            >
                                登录
                            </Button>
                        </div>
                    </main>
                }
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...state.backgroundReducer
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSetUpHandler(recommend) {
            setNewBonuses.bind(this)(recommend).then(function resolve() {
                dispatch(setNewBonusesAction.bind(this)(recommend));
            }.bind(this), function reject() {

            }.bind(this));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundView);