import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, IndexLink } from "react-router";
import { IntlProvider } from "react-intl";
import MainPage from "./containers/MainPage";

/**
 * The app class.  This is the parent component for all routes.
 * @extends {React.Component}
 */
class App extends React.Component {
    /**
     * Creates a new App
     * @constructor
     * @param {Object} props The component properties
     * @param {Object} context The component context
     */
    constructor(props, context) {
        super(props, context);
    }

    /**
     * Render a React element
     * @returns {Object} A reference to the component
     */
    render() {
        return (
            <IntlProvider locale="en">
                <MainPage>{this.props.children}</MainPage>
            </IntlProvider>
        );
    }
}

/**
 * Defines the properties for the component
 */
App.propTypes = {
    children: PropTypes.element,
    errorResponse: PropTypes.object
};

/**
 * Maps the state to props.
 * @param {any} state The state.
 * @param {any} ownProps The component's own props.
 * @returns {object} The property mapping.
 */
function mapStateToProps(state, ownProps) {
    return {
        children: ownProps.children,
        errorResponse: state.errorResponse
    };
}

export default connect(mapStateToProps)(App);
