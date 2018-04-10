const pathMode = "/keryi",
    pathDefault = "/bonuses/";
let api = {};

let isMock = false;

if (!isMock) {
    api = {
        GET_BONUSES_LIST: `${pathMode + pathDefault}`,
        GET_NEW_BONUSES: `${pathMode + pathDefault}new`
    };
} else {

}

export default api;