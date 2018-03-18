import * as actions from '../actions/actionTypes';
import reducer from './inventoryItem';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('inventoryItem', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.inventoryItem);
    });

    it('should handle LOAD_INVENTORY_ITEM_SUCCESS', () => {
        const inventoryItem = {
            "id": "1",
            "message": "Item 1"
        };

        const action = { type: actions.LOAD_INVENTORY_ITEM_SUCCESS, inventoryItem: inventoryItem };
        expect(reducer(initialState.inventoryItem, action)).toEqual(inventoryItem);
    });

    it('should handle LOAD_INVENTORY_ITEM_CLEAR', () => {
        const inventoryItem = {
            "id": "1",
            "message": "Item 1"
        };

        const itemAction = { type: actions.LOAD_INVENTORY_ITEM_SUCCESS, inventoryItem: inventoryItem };
        reducer(initialState.inventoryItem, itemAction);
        const action = { type: actions.LOAD_INVENTORY_ITEM_CLEAR};
        expect(reducer(initialState.inventoryItem, action)).toEqual(null);
    });
});