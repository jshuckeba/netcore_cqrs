import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from './actionTypes';
import * as actionCreators from './errorActions';
import 'whatwg-fetch';

const mockStore = configureMockStore([thunk]);

describe('errorActions', () => {
    it('clearErrors() should create the CLEAR_ERROR_RESPONSE action', (done) => {       
        const expectedActions = [{ type: actionTypes.CLEAR_ERROR_RESPONSE}];
        const store = mockStore({errorResponse: null}, expectedActions, done);

        store.dispatch(actionCreators.clearErrors());
            const actions = store.getActions();
            expect(actions.length).toBe(1);            
            expect(actions[0].type).toEqual(actionTypes.CLEAR_ERROR_RESPONSE);
            done();
    });
});

