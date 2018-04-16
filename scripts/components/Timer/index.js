import React from "react";
import PropTypes from "prop-types";

class Timer extends React.Component {
    static propTypes = {
        //包裹容器的样式表
        wrapClassName: PropTypes.string,
        //间隔时间的类型(最高到小时)
        type: PropTypes.string,
        //从什么时间开始(格式:HH:mm:ss)
        start: PropTypes.string,
        //到什么时间结束(格式:HH:mm:ss)
        end: PropTypes.string,
        //间隔的时间
        duration: PropTypes.number,
        //剩余的时间
        surplus: PropTypes.number,
        //间隔时间结束之后,运行的函数方法
        done: PropTypes.func,
        //服务器间隔时间结束之后,运行的函数方法
        changeRefresh: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            formatDuration: {},
            //展示的分钟数
            minute: "",
            //展示的秒数
            second: "",
            //剩余的时间
            surplus: 0
        };
        this.timer = null;
    }

    //初始化间隔的时间
    formatDurationFunc() {
        const {
            //间隔时间的类型(最高到小时)
            type,
            //间隔的时间
            duration
        } = this.props;
        switch (type) {
            case "h":
                return {
                    durationString: `0${duration}`.slice(-2),
                    durationDate: duration * 60 * 60 * 1000
                };
            case "m":
                return {
                    durationString: `0${duration}`.slice(-2),
                    durationDate: duration * 60 * 1000
                };
            case "s":
                return {
                    durationString: `0${duration}`.slice(-2),
                    durationDate: duration * 1000
                };
            default:
                return {
                    durationString: "",
                    durationDate: 0
                }
        }
    }

    componentWillMount() {
        const {
            //初始化间隔的时间
            formatDurationFunc
        } = this;
        let formatDuration = formatDurationFunc.bind(this)();
        this.setState({
            formatDuration
        });
    }

    componentWillReceiveProps(nextProps) {
        const {
            timeInterval,
            surplusTimeInterval
        } = this;
        const {
            surplus,
            count,
            changeRefresh
        } = this.props;
        if (surplus !== nextProps.surplus) {
            this.setState({
                surplus: nextProps.surplus
            }, () => {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                surplusTimeInterval.bind(this)();
            });
        }
        if (surplus === undefined) {
            timeInterval.bind(this)();
        }
        if (count && count !== nextProps.count) {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            changeRefresh();
            surplusTimeInterval.bind(this)();
        }
    }

    //倒计时
    timeInterval() {
        const {
            //从什么时间开始
            start,
            //到什么时间结束
            end,
            //间隔的时间
            duration,
            //间隔时间结束之后,运行的函数方法
            done
        } = this.props;
        const {
            //初始化的时间间隔
            formatDuration
        } = this.state;
        const {
            timeInterval
        } = this;
        let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            start_string = `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)} ${start}`,
            end_string = `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)} ${end}`,
            start_time = new Date(start_string).getTime(),
            end_time = new Date(end_string).getTime(),
            now = date.getTime(),
            second = 1000,
            durationDate = formatDuration.durationDate,
            durationWorkInteger = Math.trunc((now - start_time) / 60 / 1000 / duration),
            durationWork = durationDate - ((now - start_time) / 60 / 1000 / duration - durationWorkInteger) * duration * 60 * 1000,
            timer;
        if (end_time < start_time) {
            end_time += 24 * 60 * 60 * 1000;
        }
        if (now >= start_time && (now + durationDate) <= end_time) {
            timer = setInterval(() => {
                durationWork -= second;
                if (Math.trunc(durationWork) <= 0) {
                    done(true);
                    clearInterval(timer);
                    timeInterval.bind(this)();
                } else {
                    done(false);
                    let durationWorkMinuteAndSecond = durationWork / 60 / 1000,
                        floorDurationWork = Math.floor(durationWorkMinuteAndSecond),
                        replaceMinute = (durationWorkMinuteAndSecond - floorDurationWork) * 60;
                    this.setState({
                        minute: `0${replaceMinute === 60 ? floorDurationWork + 1 : floorDurationWork}`.slice(-2),
                        second: `0${(replaceMinute === 60 ? 0 : replaceMinute).toFixed(0)}`.slice(-2)
                    });
                }
            }, second);
        } else {
            this.setState({
                minute: '08',
                second: '00'
            });
        }
    }

    /**
     * 剩余时间倒计时
     */
    surplusTimeInterval() {
        let {
            surplus
        } = this.state;
        let second = 1000;
        this.timer = setInterval(() => {
            surplus -= second;
            if (surplus <= 0) {
                clearInterval(this.timer);
                this.timer = null;
            } else {
                let duration_surplus_minute_second = surplus / 60 / 1000,
                    duration_surplus_minute = Math.floor(duration_surplus_minute_second),
                    duration_surplus_second = (duration_surplus_minute_second - duration_surplus_minute) * 60;
                this.setState({
                    minute: `0${duration_surplus_second.toFixed(0) === "60" ? duration_surplus_minute + 1 : duration_surplus_minute}`.slice(-2),
                    second: `0${duration_surplus_second.toFixed(0) === "60" ? "0" : duration_surplus_second.toFixed(0)}`.slice(-2)
                });
            }
        }, 1000);
    }

    componentDidMount() {

    }


    render() {
        const {
            //展示的分钟数
            minute,
            //展示的秒数
            second
        } = this.state;
        const {
            //包裹容器的样式表
            wrapClassName
        } = this.props;
        return (
            <span className={wrapClassName}>
                <time>
                    {minute}
                </time>
                分
                <time>
                    {second}
                </time>
                秒
            </span>
        )
    }
}

export default Timer;