import React from "react";
import moment from "moment";
import sizeConfig from "./sizeConfig";

moment.locale("zh-cn");

export function prizeTable() {
    return [{
        title: "期号",
        key: "id",
        dataIndex: "id",
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
    let select_prize_number = ["1", "2", "3", "4", "5", "6"],
        select_prize_number_sum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        select_prize_number_span = [0, 1, 2, 3, 4, 5],
        select_prize_number_sm_lge = ["sm", "lge"],
        select_prize_number_odd_even = ["odd", "even"];
    return [{
        title: "期号",
        key: "id",
        dataIndex: "id",
        width: 100,
        className: "main-view-graph-table-rowOrHead",
        render(text, record) {
            return (
                <div>
                    {text}
                </div>
            )
        }
    }, {
        title: "开奖号码",
        key: "numberOne",
        dataIndex: "numberOne",
        width: 40,
        colSpan: 3,
        className: "main-view-graph-table-rowOrHead"
    }, {
        title: "开奖号码",
        key: "numberTwo",
        dataIndex: "numberTwo",
        width: 40,
        colSpan: 0,
        className: "main-view-graph-table-rowOrHead"
    }, {
        title: "开奖号码",
        key: "numberThree",
        dataIndex: "numberThree",
        width: 40,
        colSpan: 0,
        className: "main-view-graph-table-rowOrHead"
    }, {
        title: "开奖号码分布",
        children: select_prize_number.map((numberItem, numberIndex) => {
            return {
                title: `0${numberItem}`,
                key: `number${numberIndex}`,
                dataIndex: "number",
                width: 52,
                className: "main-view-graph-table-rowOrHead",
                render(text, record) {
                    let num_arr = text.split(",");
                    for (let [key, value] of num_arr.entries()) {
                        if (value === numberItem) {
                            return value;
                        } else {
                            return "";
                        }
                    }
                }
            }
        })
    }, {
        title: "和值",
        children: select_prize_number_sum.map((sumItem, sumIndex) => {
            return {
                title: `0${sumItem}`.slice(-2),
                key: `sum${sumIndex}`,
                dataIndex: "sum",
                width: 52,
                className: "main-view-graph-table-rowOrHead",
                render(text, record) {
                    if (text === sumItem) {
                        return text;
                    } else {
                        return "";
                    }
                }
            }
        })
    }, {
        title: "大小",
        children: select_prize_number_sm_lge.map((smLgeItem, smLgeIndex) => {
            return {
                title: sizeConfig[smLgeItem],
                key: `sm_lge_${smLgeIndex}`,
                dataIndex: "sm_lge",
                width: 52,
                className: "main-view-graph-table-rowOrHead",
                render(text, record) {
                    if (text === smLgeItem) {
                        return sizeConfig[text];
                    } else {
                        return "";
                    }
                }
            }
        })
    }, {
        title: "单双",
        children: select_prize_number_odd_even.map((oddEvenItem, oddEvenIndex) => {
            return {
                title: sizeConfig[oddEvenItem],
                key: `odd_even_${oddEvenIndex}`,
                dataIndex: "odd_even",
                width: 52,
                className: "main-view-graph-table-rowOrHead",
                render(text, record) {
                    if (text === oddEvenItem) {
                        return sizeConfig[text];
                    } else {
                        return "";
                    }
                }
            }
        })
    }, {
        title: "跨度",
        children: select_prize_number_span.map((spanItem, spanIndex) => {
            return {
                title: `${spanItem}`,
                key: `span${spanIndex}`,
                dataIndex: "span",
                width: 52,
                className: "main-view-graph-table-rowOrHead",
                render(text, record) {
                    if (text === spanItem) {
                        return text;
                    } else {
                        return "";
                    }
                }
            }
        })
    }]
}