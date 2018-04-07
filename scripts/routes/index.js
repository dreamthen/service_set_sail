import React from "react";
import {Route} from "react-router";
import {routesConfig} from "../configs/routesConfig";

const routesView = (function bornRoute(routesConfig) {
    let route;
    for (let [key, value] of routesConfig.entries()) {
        route = (value["children"] && value["children"].length > 0) ?
            (
                <Route key={key} path={value["path"]} component={value["component"]}>
                    {bornRoute(value["children"])}
                </Route>
            ) : (
                <Route path={value["path"]} component={value["component"]}/>
            );
    }
    return route;
})(routesConfig);

export default routesView;