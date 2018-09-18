import React from "react";
import moment from "moment";
import sizeConfig from "./sizeConfig";

moment.locale("zh-cn");

export function prizeTable() {
    return [{
        title: "期号",
        key: "id",
        dataIndex: "no",
        width: "20%",
        className: "main-view-prize-table-rowOrHead main-view-prize-table-rowOrHeadLeft",
        render(text, record) {
            return (
                <div>
                    {text}
                </div>
            )
        }
    }, {
        title: "时间",
        key: "date",
        dataIndex: "date",
        width: "40%",
        className: "main-view-prize-table-rowOrHead main-view-prize-table-rowOrHeadLeft",
        render(text, record) {
            return (
                <div>
                    {moment(text).format("YYYY-MM-DD HH:mm:ss")}
                </div>
            )
        }
    }, {
        title: "号码",
        key: "number",
        dataIndex: "number",
        width: "20%",
        className: "main-view-prize-table-rowOrHead main-view-prize-table-rowOrHeadLeft",
        render(text, record) {
            return (
                <div>
                    {text}
                </div>
            )
        }
    }, {
        title: "和值",
        key: "sum",
        dataIndex: "sum",
        width: "20%",
        className: "main-view-prize-table-rowOrHead",
        render(text, record) {
            return (
                <div>
                    {text}
                </div>
            )
        }
    }]
}

export function graphTable() {
    let self = this;
    let select_prize_number = ["1", "2", "3", "4", "5", "6"],
        select_prize_number_sum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        select_prize_number_span = [0, 1, 2, 3, 4, 5],
        select_prize_number_sm_lge = ["lge", "sm"],
        select_prize_number_odd_even = ["odd", "even"];
    self.canvasDOMSumInstance = new Map();
    self.canvasDOMCutBayInstance = new Map();
    return [{
        title: "期号",
        key: "id",
        dataIndex: "no",
        width: "5%",
        className: "main-view-graph-table-rowOrHead",
        render(text, record) {
            return (
                <div title={text}
                     style={Object.assign({
                         textOverflow: "ellipsis"
                     }, text.slice(-3) === "154" ? {
                         borderBottom: "2px solid #B0B0B0",
                         padding: "0 0"
                     } : {
                         borderTop: "none",
                         padding: "0 0"
                     })}>
                    {text}
                </div>
            )
        }
    }, {
        title: "开奖号码",
        key: "numberOne",
        dataIndex: "numberOne",
        width: "2.3%",
        className: "main-view-graph-table-rowOrHead main-view-graph-table-rowOrHead-prizeNumber",
        render(text, record) {
            switch (record["type"]) {
                case "black":
                    return <div style={record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    }}>
                        {text}
                    </div>;
                case "red":
                    return <div style={Object.assign({color: "#f00"}, record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    })}>
                        {text}
                    </div>;
                case "blue":
                    return <div style={Object.assign({color: "#00f"}, record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    })}>
                        {text}
                    </div>;
                default:
                    return <div style={record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    }}>
                        {text}
                    </div>;
            }
        }
    }, {
        title: "开奖号码",
        key: "numberTwo",
        dataIndex: "numberTwo",
        width: "2.3%",
        className: "main-view-graph-table-rowOrHead",
        render(text, record) {
            switch (record["type"]) {
                case "black":
                    return <div style={record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    }}>
                        {text}
                    </div>;
                case "red":
                    return <div style={Object.assign({color: "#f00"}, record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    })}>
                        {text}
                    </div>;
                case "blue":
                    return <div style={Object.assign({color: "#00f"}, record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    })}>
                        {text}
                    </div>;
                default:
                    return <div style={record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    }}>
                        {text}
                    </div>;
            }
        }
    }, {
        title: "开奖号码",
        key: "numberThree",
        dataIndex: "numberThree",
        width: "2.3%",
        className: "main-view-graph-table-rowOrHead main-view-graph-table-rowOrHead-borderRight",
        render(text, record) {
            switch (record["type"]) {
                case "black":
                    return <div style={record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    }}>
                        {text}
                    </div>;
                case "red":
                    return <div style={Object.assign({color: "#f00"}, record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    })}>
                        {text}
                    </div>;
                case "blue":
                    return <div style={Object.assign({color: "#00f"}, record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    })}>
                        {text}
                    </div>;
                default:
                    return <div style={record["no"].slice(-3) === "154" ? {
                        borderBottom: "2px solid #B0B0B0",
                        padding: "0 0"
                    } : {
                        borderTop: "none",
                        padding: "0 0"
                    }}>
                        {text}
                    </div>;
            }
        }
    }, {
        title: "开奖号码分布",
        className: "main-view-graph-table-rowOrHead main-view-graph-table-rowOrHead-borderRight",
        children: select_prize_number.map((numberItem, numberIndex) => {
            return {
                title: `0${numberItem}`,
                key: `number${numberIndex}`,
                dataIndex: "number",
                width: "3%",
                className: (numberIndex === select_prize_number.length - 1) ? "main-view-graph-table-rowOrHead main-view-graph-table-rowOrHead-borderRight" : "main-view-graph-table-rowOrHead",
                render(text, record) {
                    let num_arr = text.split(",");
                    for (let [key, value] of num_arr.entries()) {
                        if (value === numberItem) {
                            switch (record["type"]) {
                                case "black":
                                    return <div style={record["no"].slice(-3) === "154" ? {
                                        borderBottom: "2px solid #B0B0B0",
                                        padding: "0 0"
                                    } : {
                                        borderTop: "none",
                                        padding: "0 0"
                                    }}>
                                        {value}
                                    </div>;
                                case "red":
                                    return <div
                                        style={Object.assign({color: "#f00"}, record["no"].slice(-3) === "154" ? {
                                            borderBottom: "2px solid #B0B0B0",
                                            padding: "0 0"
                                        } : {
                                            borderTop: "none",
                                            padding: "0 0"
                                        })}>
                                        {value}
                                    </div>;
                                case "blue":
                                    return <div
                                        style={Object.assign({color: "#00f"}, record["no"].slice(-3) === "154" ? {
                                            borderBottom: "2px solid #B0B0B0",
                                            padding: "0 0"
                                        } : {
                                            borderTop: "none",
                                            padding: "0 0"
                                        })}>
                                        {value}
                                    </div>;
                                default:
                                    return <section
                                        style={Object.assign({
                                            height: 34,
                                            lineHeight: 1,
                                        }, record["no"].slice(-3) === "154" ? {
                                            borderBottom: "2px solid #B0B0B0",
                                        } : {
                                            borderTop: "none",
                                        })}>
                                        <div style={{
                                            position: "relative",
                                            width: 19,
                                            height: 19,
                                            margin: "0 auto",
                                            top: 8,
                                            backgroundColor: "#3182B3",
                                            borderRadius: "50%",
                                            color: "#fff"
                                        }}>
                                            {value}
                                        </div>
                                    </section>;
                            }
                        } else {
                            return <div style={Object.assign({
                                height: 34,
                                lineHeight: 1.26,
                            }, record["no"].slice(-3) === "154" ? {
                                borderBottom: "2px solid #B0B0B0",
                            } : {
                                borderTop: "none",
                            })}>

                            </div>
                        }
                    }
                }
            }
        })
    }, {
        title: "和值",
        className: "main-view-graph-table-rowOrHead main-view-graph-table-rowOrHead-borderRight",
        children: select_prize_number_sum.map((sumItem, sumIndex) => {
            return {
                title: `0${sumItem}`.slice(-2),
                key: `sum${sumIndex}`,
                dataIndex: "sum",
                width: "2.8%",
                className: sumItem > 10 ? (sumIndex === select_prize_number_sum.length - 1) ? "main-view-graph-table-rowOrHead main-view-graph-table-rowOrHead-overAdd main-view-graph-table-rowOrHead-borderRight" : "main-view-graph-table-rowOrHead main-view-graph-table-rowOrHead-overAdd" : "main-view-graph-table-rowOrHead",
                render(text, record) {
                    if (text === sumItem) {
                        switch (record["type"]) {
                            case "black":
                                return <div style={Object.assign({
                                    height: 34,
                                    lineHeight: 1.8
                                }, record["no"].slice(-3) === "154" ? {
                                    borderBottom: "2px solid #B0B0B0",
                                    padding: "0 0"
                                } : {
                                    borderTop: "none",
                                    padding: "0 0"
                                })} ref={(ref) => {
                                    getCanvasTopOrLeft(self, ref, record["id"], record["type"], "canvasDOMSumInstance");
                                }}>
                                    {text}
                                </div>;
                            case "red":
                                return <div style={Object.assign({
                                    color: "#f00",
                                    height: 34,
                                    lineHeight: 1.8
                                }, record["no"].slice(-3) === "154" ? {
                                    borderBottom: "2px solid #B0B0B0",
                                    padding: "0 0"
                                } : {
                                    borderTop: "none",
                                    padding: "0 0"
                                })} ref={(ref) => {
                                    getCanvasTopOrLeft(self, ref, record["id"], record["type"], "canvasDOMSumInstance");
                                }}>
                                    {text}
                                </div>;
                            case "blue":
                                return <div style={Object.assign({
                                    color: "#00f",
                                    height: 34,
                                    lineHeight: 1.8
                                }, record["no"].slice(-3) === "154" ? {
                                    borderBottom: "2px solid #B0B0B0",
                                    padding: "0 0"
                                } : {
                                    borderTop: "none",
                                    padding: "0 0"
                                })} ref={(ref) => {
                                    getCanvasTopOrLeft(self, ref, record["id"], record["type"], "canvasDOMSumInstance");
                                }}>
                                    {text}
                                </div>;
                            default:
                                return <div style={Object.assign({height: 34, lineHeight: 1.8},
                                    record["no"].slice(-3) === "154" ? {
                                        borderBottom: "2px solid #B0B0B0",
                                        padding: "0 0"
                                    } : {
                                        borderTop: "none",
                                        padding: "0 0"
                                    })} ref={(ref) => {
                                    getCanvasTopOrLeft(self, ref, record["id"], "black", "canvasDOMSumInstance");
                                }}>
                                    {text}
                                </div>;
                        }
                    } else {
                        return <div style={Object.assign({
                            height: 34,
                            lineHeight: 1.26
                        }, record["no"].slice(-3) === "154" ? {
                            borderBottom: "2px solid #B0B0B0",
                        } : {
                            borderTop: "none",
                        })}>

                        </div>
                    }
                }
            }
        })
    }, {
        title: "大小",
        className: "main-view-graph-table-rowOrHead",
        children: select_prize_number_sm_lge.map((smLgeItem, smLgeIndex) => {
            return {
                title: sizeConfig[smLgeItem],
                key: `sm_lge_${smLgeIndex}`,
                dataIndex: "sm_lge",
                width: "2.5%",
                className: "main-view-graph-table-rowOrHead",
                render(text, record) {
                    if (text === smLgeItem) {
                        return <div style={Object.assign({
                            color: "rgb(76,7,111)",
                            height: 34,
                            lineHeight: 1.8
                        }, record["no"].slice(-3) === "154" ? {
                            borderBottom: "2px solid #B0B0B0",
                        } : {
                            borderTop: "none",
                        })}>
                            {sizeConfig[text]}
                        </div>
                    } else {
                        return <div style={Object.assign({
                            height: 34,
                            lineHeight: 1.26,
                        }, record["no"].slice(-3) === "154" ? {
                            borderBottom: "2px solid #B0B0B0",
                        } : {
                            borderTop: "none",
                        })}>

                        </div>
                    }
                }
            }
        })
    }, {
        title: "单双",
        className: "main-view-graph-table-rowOrHead",
        children: select_prize_number_odd_even.map((oddEvenItem, oddEvenIndex) => {
            return {
                title: sizeConfig[oddEvenItem],
                key: `odd_even_${oddEvenIndex}`,
                dataIndex: "odd_even",
                width: "2.5%",
                className: "main-view-graph-table-rowOrHead",
                render(text, record) {
                    if (text === oddEvenItem) {
                        return <div
                            style={Object.assign({
                                color: "#355395",
                                height: 34,
                                lineHeight: 1.8
                            }, record["no"].slice(-3) === "154" ? {
                                borderBottom: "2px solid #B0B0B0",
                            } : {
                                borderTop: "none",
                            })}>
                            {sizeConfig[text]}
                        </div>
                    } else {
                        return <div style={Object.assign({
                            height: 34,
                            lineHeight: 1.26,
                        }, record["no"].slice(-3) === "154" ? {
                            borderBottom: "2px solid #B0B0B0",
                        } : {
                            borderTop: "none",
                        })}>

                        </div>
                    }
                }
            }
        })
    }, {
        title: "跨度",
        className: "main-view-graph-table-rowOrHead",
        children: select_prize_number_span.map((spanItem, spanIndex) => {
            return {
                title: `${spanItem}`,
                key: `span${spanIndex}`,
                dataIndex: "span",
                width: "2.5%",
                className: "main-view-graph-table-rowOrHead",
                render(text, record) {
                    if (text === spanItem) {
                        switch (record["type"]) {
                            case "black":
                                return <div style={Object.assign({
                                    height: 34,
                                    lineHeight: 1.8
                                }, record["no"].slice(-3) === "154" ? {
                                    borderBottom: "2px solid #B0B0B0",
                                } : {
                                    borderTop: "none",
                                })} ref={(ref) => {
                                    getCanvasTopOrLeft(self, ref, record["id"], record["type"], "canvasDOMCutBayInstance");
                                }}>
                                    {text}
                                </div>;
                            case "red":
                                return <div style={Object.assign({
                                    color: "#f00",
                                    height: 34,
                                    lineHeight: 1.8
                                }, record["no"].slice(-3) === "154" ? {
                                    borderBottom: "2px solid #B0B0B0",
                                } : {
                                    borderTop: "none",
                                })} ref={(ref) => {
                                    getCanvasTopOrLeft(self, ref, record["id"], record["type"], "canvasDOMCutBayInstance");
                                }}>
                                    {text}
                                </div>;
                            case "blue":
                                return <div style={Object.assign({
                                    color: "#00f",
                                    height: 34,
                                    lineHeight: 1.8
                                }, record["no"].slice(-3) === "154" ? {
                                    borderBottom: "2px solid #B0B0B0",
                                } : {
                                    borderTop: "none",
                                })} ref={(ref) => {
                                    getCanvasTopOrLeft(self, ref, record["id"], record["type"], "canvasDOMCutBayInstance");
                                }}>
                                    {text}
                                </div>;
                            default:
                                return <div style={Object.assign({
                                    height: 34,
                                    lineHeight: 1.8
                                }, record["no"].slice(-3) === "154" ? {
                                    borderBottom: "2px solid #B0B0B0",
                                } : {
                                    borderTop: "none",
                                })} ref={(ref) => {
                                    getCanvasTopOrLeft(self, ref, record["id"], "black", "canvasDOMCutBayInstance");
                                }}>
                                    {text}
                                </div>;
                        }
                    } else {
                        return <div style={Object.assign({
                            height: 34,
                            lineHeight: 1.26,
                        }, record["no"].slice(-3) === "154" ? {
                            borderBottom: "2px solid #B0B0B0",
                        } : {
                            borderTop: "none",
                        })}>

                        </div>
                    }
                }
            }
        })
    }]
}

export function getCanvasTopOrLeft(self, ref, index, type, name) {
    ref &&
    ref.getBoundingClientRect().top !== null &&
    ref.getBoundingClientRect().left !== null &&
    !self[name].has(index) &&
    self[name].set(index, {
        top: ref.getBoundingClientRect().top,
        left: ref.getBoundingClientRect().left,
        type
    });
}