import actionTypeConfig from "../configs/actionTypeConfig";

const defaultState = {
    bonusesList: [],
    current: 1,
    total: 0
};

export function graphTableReducer(state = defaultState, action) {
    let type = action["type"],
        newState = action["payload"];
    switch (type) {
        case actionTypeConfig["GET_BONUSES_LIST_ACTION"]:
            return Object.assign({}, state, newState);
    }
    return state;
}