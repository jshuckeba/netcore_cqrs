import * as actions from '../actions/actionTypes';
import reducer from './inventoryListUpdateRequest';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('inventoryListUpdateRequest', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.inventoryListUpdateRequest);
    });

    it('should handle REQUEST_UPDATE_INVENTORY_LIST_INVOKED', () => {
        
        const inventoryListUpdateRequest = "Update";
        const action = { type: actions.REQUEST_UPDATE_INVENTORY_LIST_INVOKED, inventoryListUpdateRequest: inventoryListUpdateRequest  };
        expect(reducer(initialState.inventoryListUpdateRequest, action)).toEqual(inventoryListUpdateRequest);
    });

    it('should handle REQUEST_UPDATE_INVENTORY_LIST_CLEARED', () => {

        const inventoryListUpdateRequest = { "Id": 1 };
        const itemAction = { type: actions.REQUEST_UPDATE_INVENTORY_LIST_INVOKED, inventoryListUpdateRequest: inventoryListUpdateRequest  };
        reducer(initialState.inventoryListUpdateRequest, itemAction);
        const action = { type: actions.REQUEST_UPDATE_INVENTORY_LIST_CLEARED};
        expect(reducer(initialState.inventoryListUpdateRequest, action)).toEqual(null);
    });
});