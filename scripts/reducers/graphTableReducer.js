import actionTypeConfig from "../configs/actionTypeConfig";

const defaultState = {
    bonusesList: [],
    current: 1,
    total: 0,
    time: 0,
    count: ""
};

export function graphTableReducer(state = defaultState, action) {
    let type = action["type"],
        newState = action["payload"];
    switch (type) {
        //获取开奖结果列表
        case actionTypeConfig["GET_BONUSES_LIST_ACTION"]:
            return Object.assign({}, state, newState, {
                count: state.count += 1
            });
        //重置开奖结果列表
        case actionTypeConfig["RESET_BONUSES_ACTION"]:
            return defaultState;
    }
    return state;
}