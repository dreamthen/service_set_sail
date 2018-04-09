const pathMode = "/keryi",
    pathDefault = "/bonuses/";
let api = {};

const isMock = false;

if (!isMock) {
    api = {
        GET_BONUSES_LIST: `${pathMode + pathDefault}`
    };
} else {

}