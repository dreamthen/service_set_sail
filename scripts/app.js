import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import store from "./configs/appStoreConfig";

render(<Provider store={store}>
        <Router history={browserHistory}>

        </Router>
    </Provider>, document.querySelector("#service_disport"));
