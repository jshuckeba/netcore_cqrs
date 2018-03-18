import * as actions from '../actions/actionTypes';
import initialState from './initialState';

/**
 * This reducer handles the inventory list update request
 * @param {object} [state] inventory list update request currently in the store
 * @param {object} action The action to be handled
 * @returns {object} The inventory list update request
 */
export default function inventoryListUpdateRequest(state = initialState.inventoryListUpdateRequest, action) {
    switch (action.type) {
    case actions.REQUEST_UPDATE_INVENTORY_LIST_INVOKED:
        return action.inventoryListUpdateRequest;
    case actions.REQUEST_UPDATE_INVENTORY_LIST_CLEARED:
        return null;
    default:
        return state;
    }
}