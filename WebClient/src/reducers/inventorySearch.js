import * as actions from '../actions/actionTypes';
import initialState from './initialState';

/**
 * This reducer handles the inventory search
 * @param {object} [state] inventory search currently in the store
 * @param {object} action The action to be handled
 * @returns {object} The inventory search result
 */
export default function inventorySearch(state = initialState.inventorySearch, action) {
    switch (action.type) {
    case actions.SEARCH_INVENTORY_SUCCESS:
        return action.inventorySearch;
    case actions.SEARCH_INVENTORY_FAILURE:
        return [];
    case actions.SEARCH_INVENTORY_CLEAR:
        return [];
    default:
        return state;
    }
}