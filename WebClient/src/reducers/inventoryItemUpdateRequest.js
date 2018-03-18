import * as actions from '../actions/actionTypes';
import initialState from './initialState';

/**
 * This reducer handles the inventory item update request
 * @param {object} [state] inventory item update request currently in the store
 * @param {object} action The action to be handled
 * @returns {object} The inventory item update request
 */
export default function inventoryItemUpdateRequest(state = initialState.inventoryItemUpdateRequest, action) {
    switch (action.type) {
    case actions.REQUEST_UPDATE_INVENTORY_ITEM_INVOKED:
        return action.inventoryItemUpdateRequest;
    case actions.REQUEST_UPDATE_INVENTORY_ITEM_CLEARED:
        return null;
    default:
        return state;
    }
}