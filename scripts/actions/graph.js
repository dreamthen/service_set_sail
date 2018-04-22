import axios_bonuses from "../configs/axiosConfig";
import api from "../configs/api";
import actionTypeConfig from "../configs/actionTypeConfig";
import errorConfig from "../configs/errorConfig";
import sizeConfig from "../configs/sizeConfig";

export function getBonusesList() {
    return new Promise(function promise(resolve, reject) {
        axios_bonuses({
            url: api.GET_BONUSES_LIST,
            method: "get",
            params: {
                page_size: sizeConfig.BIG_PAGE_SIZE
            },
            headers: {},
            responseType: "json",
            withCredentials: true
        }).then(function done(response) {
            let data = response["data"],
                total = response["total"],
                time = response["time"];
            let date = new Date().getDate(),
                date_arr = [],
                result_arr = [];
            for (let [key, value] of data.entries()) {
                if (date !== new Date(value["date"]).getDate() || (key === data.length - 1)) {
                    date_arr.reverse();
                    result_arr = [...result_arr, ...date_arr];
                    date = new Date(value["date"]).getDate();
                    date_arr = [];
                }
                date_arr = [...date_arr, value];
            }
            data && data.length > 0 && resolve({bonusesList: data, bonusesGraphList: result_arr, total, time});
        }, function error(err) {
            let data = err.data,
                status = err.status;
            errorConfig(status);
        }).catch(function catchError(error) {
            console.error(error);
        });
    });
}

/**
 * 获取开奖结果列表
 * @param payload
 * @returns {{type: *}}
 */
export function getBonusesListAction(payload) {
    return {
        type: actionTypeConfig["GET_BONUSES_LIST_ACTION"],
        payload
    }
}

/**
 * 重置开奖结果列表
 * @returns {{type: *}}
 */
export function resetBonusesAction() {
    return {
        type: actionTypeConfig["RESET_BONUSES_ACTION"]
    }
}