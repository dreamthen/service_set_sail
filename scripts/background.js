import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import BackgroundView from "./containers/BackgroundView";
import store from "./configs/backgroundStore";
import "../stylesheets";

render(
    <Provider store={store}>
        <BackgroundView
        />
    </Provider>,
    document.querySelector("#service-backGround")
);