import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";

render(<Provider store={}>
        <Router history={browserHistory}>

        </Router>
    </Provider>, document.querySelector("#service_disport"));
