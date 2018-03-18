import * as actions from "./actionTypes";

/**
 * Clears the success response.
 * @returns {funtion} A function that returns a Promise.
 */
export function clearSuccess() {
    return function (dispatch) {
        return dispatch({ type: actions.CLEAR_SUCCESS_RESPONSE });
    };
}