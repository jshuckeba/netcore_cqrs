import * as actions from '../actions/actionTypes';
import initialState from './initialState';

/**
 * This reducer handles the inventory item updated
 * @param {object} [state] updated value currently in the store
 * @param {object} action The action to be handled
 * @returns {boolean} true for updated, false for not created
 */
export default function inventoryItemUpdated(state = initialState.inventoryItemUpdated, action) {
    switch (action.type) {
    case actions.CHECK_IN_OR_REMOVE_INVENTORY_SUCCESS:
        return true;
    case actions.UPDATE_INVENTORY_DETAILS_SUCCESS:
        return true;
    case actions.CLEAR_SUCCESS_RESPONSE:
        return false;
    default:
        return state;
    }
}