import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import {LocaleProvider} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import store from "./configs/appStoreConfig";
import routes from "./routes";
import "./stylesheets";


render(<Provider store={store}>
    <LocaleProvider locale={zh_CN}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </LocaleProvider>
</Provider>, document.querySelector("#service_disport"));