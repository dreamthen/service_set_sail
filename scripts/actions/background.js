import axios_bonuses from "../configs/axiosConfig";
import api from "../configs/api";
import {message} from "antd";
import errorConfig from "../configs/errorConfig";
import actionTypeConfig from "../configs/actionTypeConfig";

export function setNewBonuses(recommend) {
    return new Promise(function promise(resolve, reject) {
        axios_bonuses({
            url: api.SET_NEW_BONUSES,
            method: "post",
            data: {
                recommend
            },
            responseType: "json",
            headers: {
                "x-csrf-token": "T2ra0MDlY6NLo1hxCRwVh4I0"
            },
            withCredentials: true
        }).then(function done(response) {
            let data = response;
            message.success("设置成功");
            resolve();
        }.bind(this), function error(response) {
            let data = response,
                status = response.status;
            errorConfig.bind(this)(status);
        }.bind(this)).catch(function catchError(err) {
            console.error(err);
        }.bind(this));
    });
}

export function setNewBonusesAction(payload) {
    return {
        type: actionTypeConfig["SET_NEW_BONUSES_ACTION"],
        payload
    }
}

