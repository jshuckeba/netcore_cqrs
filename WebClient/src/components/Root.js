import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute } from "react-router";
import App from "./App";
import NotFoundPage from "./NotFoundPage";
import InventoryPage from "./containers/InventoryPage";

/**
 * The Root component renders the Router and connects everything to the store
 * @extends {Component}
 */
export default class Root extends Component {
    /**
     * Creates a new Root
     * @constructor
     * @param {Object} props The component properties
     * @param {Object} context The component context
     */
    constructor(props, context) {
        super(props, context);

        this.getRoutes = this.getRoutes.bind(this);
    }

    /**
     * Gets the routes
     */
    getRoutes() {
        return (
            <Route>
                <Route path="/" component={App} name="Dashboard">
                    <Route path="*" component={NotFoundPage} />
                    <IndexRoute component={InventoryPage} />
                </Route>
            </Route >
        );
    }

    /**
     * Render a React element
     * @returns {Object} A reference to the component
     */
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <Router history={history} routes={this.getRoutes()} />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};