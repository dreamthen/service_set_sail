import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import {persistState} from "redux-devtools";
import reducers from "../reducers";

const production = process.env.NODE_ENV;
let middleware = [];

const PRODUCTION = "pro";

if(production === PRODUCTION) {
    middleware = [...middleware, thunkMiddleware];
}else {
    middleware = [...middleware, thunkMiddleware, loggerMiddleware];
}

const compose_store = compose([
    applyMiddleware(...middleware),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
])(createStore);

const store = compose_store(reducers, {});

export default store;

