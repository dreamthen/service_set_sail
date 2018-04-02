import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import {persistState} from "redux-devtools";

const production = process.env.NODE_ENV;
let middleware = [];

const PRODUCTION = "pro";

if(production === PRODUCTION) {
    middleware = [...middleware, thunkMiddleware];
}else {
    middleware = [...middleware, thunkMiddleware, loggerMiddleware];
}

