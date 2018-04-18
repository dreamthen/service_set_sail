import MainView from "../containers/MainView";
import PrizeView from "../containers/PrizeView";
import GraphView from "../containers/GraphView";

export const routesConfig = [{
    path: "/",
    component: MainView,
    children: [
        {
            path: "prize",
            component: PrizeView
        }, {
            path: "graph",
            component: GraphView
        }
    ]
}];

export let linkConfig = [{
    to: "/prize",
    active: true,
    content: "结果",
    iconClassName: ""
}, {
    to: "/graph",
    content: "走势图"
}];