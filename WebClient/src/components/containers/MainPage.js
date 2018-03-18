import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Dimmer, Grid, Icon, Label, Loader, Segment, Sidebar } from "semantic-ui-react";
import * as errorActions from "../../actions/errorActions";
import * as toastOptions from "../../constants/toast";

/**
 * MainPage container component
 * @extends {react.Component}
 */
export class MainPage extends React.Component {
    /**
     * Creates a new LoginPage
     * @constructor
     * @param {Object} props The component properties
     * @param {Object} context The component context
     */
    constructor(props, context) {
        super(props, context);
    }

    /**
     * Invoked when the component receives new properties
     * @param {any} nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.errorResponse !== this.props.errorResponse && nextProps.errorResponse) {

            setTimeout(function () { this.props.actions.clearErrors(); }.bind(this), toastOptions.TOAST_TIMEOUT);
        }
    }

    /**
     * Render a React element
     * @returns {Object} A reference to the component
     */
    render() {
        const showError = (this.props.errorResponse !== undefined && this.props.errorResponse != null);
        return (
            <div>
                <Sidebar as={Container} style={{ paddingTop: "0.5em", paddingBottom: "0.5em", backgroundColor: "#9f3a38", color: "#FFFFFF", fontSize: "2em" }} animation="overlay" direction="top" visible={showError}>
                    <span style={{marginLeft: "2em"}}><Icon className="fas fa-exclamation-circle" /> Oops! Something went sideways!</span>
                </Sidebar>
                <Container>
                    <div style={{display: "flex"}}>
                        <div style={{float: "left", marginTop: "5em"}}>
                            <Icon className="fas fa-code" style={{ marginRight: "0.25em", fontSize: "6em", verticalAlign: "center" }} />
                        </div>
                        <div style={{float: "right", marginTop: "5em"}}>
                            <span style={{ fontSize: "2em", fontWeight: "bold", marginLeft: "0.5em" }}>
                                CQRS, Event Sourcing, ElasticSearch, and SignalR
                            </span>
                        </div>
                    </div>
                </Container>
                <Dimmer active={this.props.pendingTasks > 0}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Container style={{ marginTop: "1em" }}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

/**
 * Defines the properties for the component
 */
MainPage.propTypes = {
    children: PropTypes.element,
    routes: PropTypes.array,
    params: PropTypes.object,
    currentLocation: PropTypes.string,
    showTabNav: PropTypes.bool,
    hideMainErrorSummary: PropTypes.bool,
    pendingTasks: PropTypes.number,
    errorResponse: PropTypes.object,
    currentUserAuthorizations: PropTypes.array,
    actions: PropTypes.object
};

/**
 * Maps items from state to properties of the component
 * @param {Object} state The state
 * @param {Object} ownProps The properties belonging to this component
 * @returns {Object} An object containing properties that the component can access
 */
function mapStateToProps(state, ownProps) {
    const result = {
        routes: ownProps.children.props.routes,
        params: ownProps.children.props.params,
        currentLocation: ownProps.children.props.location.pathname,
        pendingTasks: state.pendingTasks,
        errorResponse: state.errorResponse
    };
    return result;
}

/**
 * Binds actions to the dispatcher
 * @param {Object} dispatch The action dispatcher
 * @returns {Object} An object containing properties that the component can access
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(errorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);