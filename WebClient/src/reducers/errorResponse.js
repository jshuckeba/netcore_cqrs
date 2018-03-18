import * as actions from "../actions/actionTypes";
import initialState from './initialState';

/**
 * This reducer handles any action that has an errorResponse property and resets errorResponse state if the action doesn't have an errorReponse
 * property.  So the action with the errorResponse should be the last action dispatched in the request.
 * @param {object} [state] The errorResponse currently in the store, or the initial state of errorResponse
 * @param {object} action The action to be handled
 * @returns {object} The errorResponse
 */
export default function errorResponse(state = initialState.errorResponse, action) {
    if (action.errorResponse) {
        return action.errorResponse;
    }

    if (action.type === actions.CLEAR_ERROR_RESPONSE) {
        return null;
    }

    return state;
}