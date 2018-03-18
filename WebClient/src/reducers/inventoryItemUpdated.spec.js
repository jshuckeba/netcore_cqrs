import * as actions from '../actions/actionTypes';
import reducer from './inventoryItemUpdated';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('inventoryItemUpdated', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.inventoryItemUpdated);
    });

    it('should handle CHECK_IN_OR_REMOVE_INVENTORY_SUCCESS', () => {

        const action = { type: actions.CHECK_IN_OR_REMOVE_INVENTORY_SUCCESS };
        expect(reducer(initialState.inventoryItemUpdated, action)).toEqual(true);
    });

    it('should handle UPDATE_INVENTORY_DETAILS_SUCCESS', () => {

        const action = { type: actions.UPDATE_INVENTORY_DETAILS_SUCCESS };
        expect(reducer(initialState.inventoryItemUpdated, action)).toEqual(true);
    });

    it('should handle CLEAR_SUCCESS_RESPONSE', () => {

        const itemAction = { type: actions.CHECK_IN_OR_REMOVE_INVENTORY_SUCCESS};
        reducer(initialState.inventoryItemUpdated, itemAction);
        const action = { type: actions.CLEAR_SUCCESS_RESPONSE};
        expect(reducer(initialState.inventoryItemUpdated, action)).toEqual(false);
    });
});