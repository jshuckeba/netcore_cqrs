import * as actions from '../actions/actionTypes';
import initialState from './initialState';

/**
 * This reducer handles the inventory item created
 * @param {object} [state] created value currently in the store
 * @param {object} action The action to be handled
 * @returns {boolean} true for created, false for not created
 */
export default function inventoryItemCreated(state = initialState.inventoryItemCreated, action) {
    switch (action.type) {
    case actions.CREATE_INVENTORY_ITEM_SUCCESS:
        return true;
    case actions.CLEAR_SUCCESS_RESPONSE:
        return false;
    default:
        return state;
    }
}