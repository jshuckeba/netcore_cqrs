import * as actions from '../actions/actionTypes';
import reducer from './inventorySearch';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('inventorySearch', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.inventorySearch);
    });

    it('should handle SEARCH_INVENTORY_SUCCESS', () => {
        
        const inventorySearch = [{ "id": 1 }, {"id": 2}];
        const action = { type: actions.SEARCH_INVENTORY_SUCCESS, inventorySearch: inventorySearch  };
        expect(reducer(initialState.inventorySearch, action)).toEqual(inventorySearch);
    });

    it('should handle SEARCH_INVENTORY_FAILURE', () => {

        const inventorySearch = [{ "id": 1 }, { "id": 2 }];
        const successAction = { type: actions.SEARCH_INVENTORY_SUCCESS, inventorySearch: inventorySearch };
        reducer(initialState.inventorySearch, successAction);
        const action = { type: actions.SEARCH_INVENTORY_FAILURE};
        expect(reducer(initialState.inventorySearch, action)).toEqual([]);
    });

    it('should handle SEARCH_INVENTORY_CLEAR', () => {

        const inventorySearch = [{ "id": 1 }, { "id": 2 }];
        const successAction = { type: actions.SEARCH_INVENTORY_SUCCESS, inventorySearch: inventorySearch };
        reducer(initialState.inventorySearch, successAction);
        const action = { type: actions.SEARCH_INVENTORY_CLEAR };
        expect(reducer(initialState.inventorySearch, action)).toEqual([]);
    });
});