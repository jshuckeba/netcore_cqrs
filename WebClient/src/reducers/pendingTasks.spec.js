import * as actions from '../actions/actionTypes';
import reducer from './pendingTasks';
import initialState from './initialState';

const unknownAction = { type: 'unknown' };

describe('pendingTasks', () => {
    it('should set initial state by default', () => {
        expect(reducer(undefined, unknownAction)).toEqual(initialState.pendingTasks);
    });

    it('should handle TASK_BEGIN and TASK_END', () => {

        const expectedBeginValue = initialState.pendingTasks + 1;
        const expectedEndValue = expectedBeginValue - 1;
        const taskBeginAction = { type: actions.TASK_BEGIN };
        const taskEndAction = { type: actions.TASK_END };
        let pendingTaskCount = reducer(initialState.pendingTasks, taskBeginAction);
        expect(pendingTaskCount).toEqual(expectedBeginValue);
        pendingTaskCount = reducer(initialState.pendingTasks, taskEndAction);
        expect(pendingTaskCount).toEqual(expectedEndValue);
    });
});