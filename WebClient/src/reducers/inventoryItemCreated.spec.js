import * as actions from '../actions/actionTypes';
import reducer from './inventoryItemCreated';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('inventoryItemCreated', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.inventoryItemCreated);
    });

    it('should handle CREATE_INVENTORY_ITEM_SUCCESS', () => {

        const action = { type: actions.CREATE_INVENTORY_ITEM_SUCCESS };
        expect(reducer(initialState.inventoryItemCreated, action)).toEqual(true);
    });

    it('should handle LOAD_INVENTORY_ITEM_CLEAR', () => {

        const itemAction = { type: actions.CREATE_INVENTORY_ITEM_SUCCESS};
        reducer(initialState.inventoryItemCreated, itemAction);
        const action = { type: actions.CLEAR_SUCCESS_RESPONSE};
        expect(reducer(initialState.inventoryItemCreated, action)).toEqual(false);
    });
});