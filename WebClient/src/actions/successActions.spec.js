import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from './actionTypes';
import * as actionCreators from './successActions';
import 'whatwg-fetch';

const mockStore = configureMockStore([thunk]);

describe('successActions', () => {
    it('clearSuccess() should create the CLEAR_SUCCESS_RESPONSE action', (done) => {               
        const expectedActions = [{ type: actionTypes.CLEAR_SUCCESS_RESPONSE}];
        const store = mockStore({successResponse: null}, expectedActions, done);

        store.dispatch(actionCreators.clearSuccess());
            const actions = store.getActions();
            expect(actions.length).toBe(1);            
            expect(actions[0].type).toEqual(actionTypes.CLEAR_SUCCESS_RESPONSE);
            done();
    });
});