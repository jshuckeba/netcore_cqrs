import * as actions from '../actions/actionTypes';
import initialState from './initialState';

/**
 * This reducer handles the inventory item deactivated
 * @param {object} [state] deactivated value currently in the store
 * @param {object} action The action to be handled
 * @returns {boolean} true for deactivated, false for not deactivated
 */
export default function inventoryItemDeactivated(state = initialState.inventoryItemDeactivated, action) {
    switch (action.type) {
    case actions.DEACTIVATE_INVENTORY_ITEM_SUCCESS:
        return true;
    case actions.CLEAR_SUCCESS_RESPONSE:
        return false;
    default:
        return state;
    }
}