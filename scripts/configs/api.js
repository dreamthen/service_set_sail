const pathMode = "/keryi",
    pathDefault = "/bonuses/";
let api = {};

let isMock = false;

if (!isMock) {
    api = {
        GET_BONUSES_LIST: `${pathMode + pathDefault}`
    };
} else {

}

export default api;