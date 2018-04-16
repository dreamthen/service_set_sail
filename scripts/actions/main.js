import axios_bonuses from "../configs/axiosConfig";
import api from "../configs/api";
import errorConfig from "../configs/errorConfig";
import actionTypeConfig from "../configs/actionTypeConfig";

export function getNewBonuses() {
    return new Promise(function promise(resolve, reject) {
        axios_bonuses({
            url: api.GET_NEW_BONUSES,
            method: "get",
            params: {},
            responseType: "json",
            headers: {},
            withCredentials: true
        }).then(function done(response) {
            let data = response;
            resolve();
        }.bind(this), function error(err) {
            let data = err.data,
                status = err.status;
            errorConfig(status);
        }.bind(this)).catch(function catchError(error) {
            console.error(error);
        }.bind(this));
    }.bind(this));
}

export function getNewBonusesAction(payload) {
    return {
        type: actionTypeConfig["GET_NEW_BONUSES_ACTION"],
        payload
    }
}

export function changeNewBonusesIdAction(payload) {
    return {
        type: actionTypeConfig["CHANGE_NEW_BONUSES_ID_ACTION"],
        payload
    }
}