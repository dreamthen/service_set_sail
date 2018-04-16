import {combineReducers} from "redux";
import {prizeTableReducer} from "./prizeTableReducer";
import {graphTableReducer} from "./graphTableReducer";
import actionTypeConfig from "../configs/actionTypeConfig"

const defaultState = {
    id: 0,
    bonusesList: [],
    isFresh: false
};

export function mainReducer(state = defaultState, action) {
    let type = action["type"],
        newState = action["payload"];
    switch (type) {
        case actionTypeConfig["GET_NEW_BONUSES_ACTION"]:
            return Object.assign({}, state, {
                isFresh: newState
            });
        case actionTypeConfig["CHANGE_NEW_BONUSES_ID_ACTION"]:
            return Object.assign({}, state, {
                [newState["name"]]: newState["value"]
            });
    }
    return state;
}

const reducers = combineReducers({
    mainReducer,
    prizeTableReducer,
    graphTableReducer
});

export default reducers;