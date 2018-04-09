import axios from "axios";
import codeConfig from "./codeConfig";
import errorConfig from "./errorConfig";

const axios_bonuses = axios.create({});

axios_bonuses.interceptors.request.use(function resolve(request) {
    return request;
}, function reject(request) {

});

axios_bonuses.interceptors.response.use(function resolve(response) {
    let data = response["data"],
        status = response["status"];
    if (status === codeConfig["successCode"]) {
        return data;
    }
    return Promise.reject(response);
}, function reject(response) {
    let status = response["status"];
    errorConfig(status);
});

export default axios_bonuses;
