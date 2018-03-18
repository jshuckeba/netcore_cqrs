import * as actions from '../actions/actionTypes';
import reducer from './inventoryItemUpdateRequest';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('inventoryItemUpdateRequest', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.inventoryItemUpdateRequest);
    });

    it('should handle REQUEST_UPDATE_INVENTORY_ITEM_INVOKED', () => {
        
        const inventoryItemUpdateRequest = { "Id": 1 };
        const action = { type: actions.REQUEST_UPDATE_INVENTORY_ITEM_INVOKED, inventoryItemUpdateRequest: inventoryItemUpdateRequest  };
        expect(reducer(initialState.inventoryItemUpdateRequest, action)).toEqual(inventoryItemUpdateRequest);
    });

    it('should handle REQUEST_UPDATE_INVENTORY_ITEM_CLEARED', () => {

        const inventoryItemUpdateRequest = { "Id": 1 };
        const itemAction = { type: actions.REQUEST_UPDATE_INVENTORY_ITEM_INVOKED, inventoryItemUpdateRequest: inventoryItemUpdateRequest  };
        reducer(initialState.inventoryItemUpdateRequest, itemAction);
        const action = { type: actions.REQUEST_UPDATE_INVENTORY_ITEM_CLEARED};
        expect(reducer(initialState.inventoryItemUpdateRequest, action)).toEqual(null);
    });
});