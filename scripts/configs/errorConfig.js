import {message} from "antd";
export default function errorConfig(status) {
    let error_reg = /50[0-9]?$/,
        notFound = 404;
    if (error_reg.test(status)) {
        message.error("服务器异常，请稍后重试");
    }
    if (status === notFound) {
        message.error("服务器或者客户端找不到可用文件，请稍后重试");
    }
}