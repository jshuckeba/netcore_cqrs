import * as actions from "./actionTypes";

/**
 * Clear the errors.
 * @returns {Promise} A promise that resolves to the Response object representing the response to your request.
 */
export function clearErrors() {
    return function (dispatch) {
        return dispatch({ type: actions.CLEAR_ERROR_RESPONSE });
    };
}