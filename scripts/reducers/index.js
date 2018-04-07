import {combineReducers} from "redux";
import {prizeTableReducer} from "./prizeTableReducer";
const defaultState = {
    id: "0"
};

export function mainReducer(state = defaultState, action) {
    let type = action["type"],
        newState = action["payload"];
    switch (type) {

    }
    return state;
}

const reducers = combineReducers({
    mainReducer,
    prizeTableReducer
});

export default reducers;