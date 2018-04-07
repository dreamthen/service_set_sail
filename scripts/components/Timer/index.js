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
        //间隔时间结束之后,运行的函数方法
        done: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            formatDuration: {}
        };
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

    //倒计时
    timeInterval() {
        const {
            //从什么时间开始
            start,
            //到什么时间结束
            end,
            //间隔的时间
            duration
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
                console.log(durationWork);
                durationWork -= second;
                if (Math.trunc(durationWork) <= 0) {
                    clearInterval(timer);
                    timeInterval.bind(this)();
                }
            }, second);
        }
    }

    componentDidMount() {
        const {
            timeInterval
        } = this;
        timeInterval.bind(this)();
    }


    render() {
        return (
            <span>

            </span>
        )
    }
}

export default Timer;