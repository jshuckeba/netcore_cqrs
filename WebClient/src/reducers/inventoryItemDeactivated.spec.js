import * as actions from '../actions/actionTypes';
import reducer from './inventoryItemDeactivated';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('inventoryItemDeactivated', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.inventoryItemDeactivated);
    });

    it('should handle DEACTIVATE_INVENTORY_ITEM_SUCCESS', () => {

        const action = { type: actions.DEACTIVATE_INVENTORY_ITEM_SUCCESS };
        expect(reducer(initialState.inventoryItemDeactivated, action)).toEqual(true);
    });

    it('should handle CLEAR_SUCCESS_RESPONSE', () => {

        const itemAction = { type: actions.DEACTIVATE_INVENTORY_ITEM_SUCCESS};
        reducer(initialState.inventoryItemDeactivated, itemAction);
        const action = { type: actions.CLEAR_SUCCESS_RESPONSE};
        expect(reducer(initialState.inventoryItemDeactivated, action)).toEqual(false);
    });
});