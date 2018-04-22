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
                orders: "asc",
                page_size: sizeConfig.BIG_PAGE_SIZE
            },
            headers: {},
            responseType: "json",
            withCredentials: true
        }).then(function done(response) {
            let data = response["data"],
                total = response["total"],
                time = response["time"],
                bonusesList = Object.assign([], data);
            bonusesList.reverse();
            data && data.length > 0 && resolve({bonusesList: bonusesList, bonusesGraphList: data, total, time});
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