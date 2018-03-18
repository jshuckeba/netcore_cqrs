import * as actions from '../actions/actionTypes';
import reducer from './errorResponse';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('errorResponse', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.errorResponse);
    });

    it('should handle errorResponse', () => {
        const errorResponse = {
            "status": 401,
            "message": "Something went sideways!"
        };

        const action = { type: actions.DEACTIVATE_INVENTORY_ITEM_SUCCESS, errorResponse: errorResponse};
        expect(reducer(initialState.errorResponse, action)).toEqual(errorResponse);
    });

    it('should handle CLEAR_ERROR_RESPONSE', () => {
        const errorResponse = {
            "status": 401,
            "message": "Something went sideways!"
        };

        const errorAction = { type: actions.DEACTIVATE_INVENTORY_ITEM_SUCCESS, errorResponse: errorResponse };
        reducer(initialState.errorResponse, errorAction);
        const action = { type: actions.CLEAR_ERROR_RESPONSE };
        expect(reducer(initialState.errorResponse, action)).toEqual(null);
    });
});