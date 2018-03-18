import * as actions from './actionTypes';
import * as errorResponses from '../constants/errorResponses';

/**
 * Determines whether the response is an error response.
 * @param {any} responseBody The body of the response.
 * @returns {boolean} True if the response body is an error response, otherwise false.
 */
export const isErrorResponse = responseBody => {
    if (responseBody && responseBody.errorCode) {
        return true;
    }

    return false;
};

/**
 * Dispatches the error and ends the task.
 * @param {any} dispatch The dispatcher.
 * @param {any} actionType The type of action.
 * @param {any} errorResponse The error response.
 * @param {any} error The error.
 * @returns {funtion} A function that returns a Promise.
 */
export const dispatchErrorAndEndTask = (dispatch, actionType, errorResponse, error) => {
    if (error) {
        console.error(error); // eslint-disable-line no-console
    }

    errorResponse = errorResponse || errorResponses.defaultErrorResponse;

    console.error("%s: (%s) %s", actionType, errorResponse.errorCode, errorResponse.message); // eslint-disable-line no-console

    dispatch({ type: actionType, errorResponse: errorResponse || errorResponses.defaultErrorResponse });
    return dispatch({ type: actions.TASK_END });
};