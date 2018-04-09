import axios_bonuses from "../configs/axiosConfig";
import {message} from "antd";
import api from "../configs/api";
import sizeConfig from "../configs/sizeConfig";

export function getBonusesList(pageNum) {
    return new Promise(function promise(resolve, reject) {
        axios_bonuses({
            url: `${api.GET_BONUSES_LIST}`,
            method: "get",
            params: {
                pageNum,
                pageSize: sizeConfig.PAGE_SIZE
            },
            headers: {},
            responseType: "json",
            withCredentials: true
        }).then(function done(response) {
            let data = response["data"],
                total = response["total"];
            data && data.length > 0 && resolve({bonusesList: data, total});
        }, function error(err) {
            let data = err.data,
                head = data.head,
                msg = head.msg;
            message.warning(msg);
        }).catch(function catchError(error) {
            console.error(error);
        });
    });
}