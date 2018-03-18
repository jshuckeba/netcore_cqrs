import * as actions from '../actions/actionTypes';
import initialState from './initialState';

/**
 * This reducer handles the inventory item
 * @param {object} [state] inventory item currently in the store
 * @param {object} action The action to be handled
 * @returns {object} The inventory item
 */
export default function inventoryItem(state = initialState.inventoryItem, action) {
    switch (action.type) {
    case actions.LOAD_INVENTORY_ITEM_SUCCESS:
        return action.inventoryItem;
    case actions.LOAD_INVENTORY_ITEM_CLEAR:
        return null;
    default:
        return state;
    }
}