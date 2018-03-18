import React from "react";
import { render } from "react-dom";
import { browserHistory } from "react-router";
import { AppContainer } from "react-hot-loader";
import Root from "./components/Root";
import store from "./store/configureStore";
import "semantic-ui-css/semantic.min.css";
import "font-awesome/css/font-awesome.min.css"; 

require("./favicon.ico"); // Tell webpack to load favicon.ico
import "./css/styles.scss"; // Yep, that"s right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from "react-router-redux";

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
render(
    <AppContainer>
        <Root store={store} history={history}/>
    </AppContainer>,
    document.getElementById("app")
);

if (module.hot) {
    module.hot.accept("./components/Root",
        () => {
            const newRoot = require("./components/Root").default;
            render(
                <AppContainer>
                    <newRoot store={store} history={history}/>
                </AppContainer>,
                document.getElementById("app")
            );
        });
}