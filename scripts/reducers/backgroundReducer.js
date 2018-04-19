import actionTypeConfig from "../configs/actionTypeConfig";

const defaultState = {
    recommend: ""
};

export function backgroundReducer(state = defaultState, actions) {
    let type = actions["type"],
        newState = actions["payload"];
    switch (type) {
        case actionTypeConfig["SET_NEW_BONUSES_ACTION"]:
            return Object.assign({}, state, {
                recommend: newState
            });
    }
    return state;
}