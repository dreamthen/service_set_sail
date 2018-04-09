import React from "react";
import {Route, IndexRedirect} from "react-router";
import {routesConfig} from "../configs/routesConfig";

const routesView = (function bornRoute(routesConfig) {
    let route,
        routeSon_arr = [];
    for (let [key, value] of routesConfig.entries()) {
        if (value["children"] && value["children"].length > 0) {
            route = (
                <Route key={key} path={value["path"]} component={value["component"]}>
                    <IndexRedirect to={`/${value["children"][0]["path"]}`}/>
                    {bornRoute.bind(this)(value["children"])}
                </Route>
            )
        } else {
            routeSon_arr = [...routeSon_arr, <Route key={key} path={value["path"]} component={value["component"]}/>];
        }
    }
    if (routeSon_arr.length > 0) {
        return routeSon_arr.map((routeItem, routeIndex) => {
            return routeItem;
        });
    } else {
        return route;
    }
})(routesConfig);

export default routesView;