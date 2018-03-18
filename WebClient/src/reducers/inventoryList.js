import * as actions from '../actions/actionTypes';
import initialState from './initialState';

/**
 * This reducer handles the inventory list
 * @param {object} [state] inventory list currently in the store
 * @param {object} action The action to be handled
 * @returns {array} Auth
 */
export default function inventoryList(state = initialState.inventoryList, action) {
    switch (action.type) {
    case actions.LOAD_INVENTORY_LIST_SUCCESS:
        return action.inventoryList || [];
    default:
        return state;
    }
}