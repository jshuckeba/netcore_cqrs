import * as actions from '../actions/actionTypes';
import initialState from './initialState';

let pendingTaskCount = 0;

/**
 * This reducer handles the pending task count
 * @param {object} [state] pending task count tcurrently in the store
 * @param {object} action The action to be handled
 * @returns {number} The pending task count
 */
export default function pendingTasks(state = initialState.pendingTasks, action) {
    switch (action.type) {
    case actions.TASK_BEGIN:
        pendingTaskCount += 1;
        return pendingTaskCount;
    case actions.TASK_END:
        pendingTaskCount -= 1;
        return pendingTaskCount;
    default:
        return state;
    }
}