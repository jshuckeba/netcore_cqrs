import * as actions from '../actions/actionTypes';
import reducer from './inventoryList';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('inventoryList', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.inventoryList);
    });

    it('should handle LOAD_INVENTORY_LIST_SUCCESS with item', () => {

        const inventoryList = [{ "id": 1 }, {"id": 2}];
        const action = { type: actions.LOAD_INVENTORY_LIST_SUCCESS, inventoryList: inventoryList  };
        expect(reducer(initialState.inventoryList, action)).toEqual(inventoryList);
    });

    it('should handle LOAD_INVENTORY_LIST_SUCCESS with no item', () => {

        const expectedValue = [];
        const action = { type: actions.LOAD_INVENTORY_LIST_SUCCESS };
        expect(reducer(initialState.inventoryList, action)).toEqual(expectedValue);
    });
});