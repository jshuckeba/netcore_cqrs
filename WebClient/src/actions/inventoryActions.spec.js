import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from './actionTypes';
import * as actionCreators from './inventoryActions';
import 'whatwg-fetch';

const mockStore = configureMockStore([thunk]);
const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
        status,
        statusText,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

describe('inventoryActions', () => {
    it('fetchInventoryList() should create the TASK_BEGIN, REQUEST_UPDATE_INVENTORY_LIST_CLEARED, LOAD_INVENTORY_LIST_SUCCESS and TASK_END actions', (done) => {       
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '[{"id": 1}]')));
        const expectedActions = [
            { type: actionTypes.TASK_BEGIN },
            { type: actionTypes.REQUEST_UPDATE_INVENTORY_LIST_CLEARED },
            { type: actionTypes.LOAD_INVENTORY_LIST_SUCCESS, inventoryList: [] },
            { type: actionTypes.TASK_END }];
        const store = mockStore({inventoryList: []}, expectedActions, done);

        store.dispatch(actionCreators.fetchInventoryList()).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(4);
            expect(actions[0].type).toEqual(actionTypes.TASK_BEGIN);
            expect(actions[1].type).toEqual(actionTypes.REQUEST_UPDATE_INVENTORY_LIST_CLEARED);
            expect(actions[2].type).toEqual(actionTypes.LOAD_INVENTORY_LIST_SUCCESS);
            expect(actions[3].type).toEqual(actionTypes.TASK_END);
            done();
        });
    });
});

describe('inventoryActions', () => {
    it('fetchInventoryItem(id) should create the TASK_BEGIN, REQUEST_UPDATE_INVENTORY_ITEM_CLEARED, LOAD_INVENTORY_ITEM_SUCCESS and TASK_END actions', (done) => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '[{"id": 1}]')));

        const expectedActions = [
            { type: actionTypes.TASK_BEGIN },
            { type: actionTypes.REQUEST_UPDATE_INVENTORY_ITEM_CLEARED },
            { type: actionTypes.LOAD_INVENTORY_ITEM_SUCCESS, inventoryList: [] },
            { type: actionTypes.TASK_END }];
        const store = mockStore({ inventoryItem: { "id": 1 } }, expectedActions, done);

        store.dispatch(actionCreators.fetchInventoryItem(1)).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(4);
            expect(actions[0].type).toEqual(actionTypes.TASK_BEGIN);
            expect(actions[1].type).toEqual(actionTypes.REQUEST_UPDATE_INVENTORY_ITEM_CLEARED);
            expect(actions[2].type).toEqual(actionTypes.LOAD_INVENTORY_ITEM_SUCCESS);
            expect(actions[3].type).toEqual(actionTypes.TASK_END);
            done();
        });
    });
});

describe('inventoryActions', () => {
    it('clearInventoryItem() should create the LOAD_INVENTORY_ITEM_CLEAR action', (done) => {
        const expectedActions = [{ type: actionTypes.LOAD_INVENTORY_ITEM_CLEAR }];
        const store = mockStore({ inventoryItem: null }, expectedActions, done);

        store.dispatch(actionCreators.clearInventoryItem());
        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toEqual(actionTypes.LOAD_INVENTORY_ITEM_CLEAR);
        done();
    });
});

describe('inventoryActions', () => {
    it('searchInventoryList() should create the SEARCH_INVENTORY_SUCCESS action', (done) => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '[{"id": 1}]')));

        const expectedActions = [
            { type: actionTypes.SEARCH_INVENTORY_SUCCESS, inventorySearch: [] }];
        const store = mockStore({ inventorySearch: [] }, expectedActions, done);

        store.dispatch(actionCreators.searchInventoryList("test", 5)).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(1);
            expect(actions[0].type).toEqual(actionTypes.SEARCH_INVENTORY_SUCCESS);
            done();
        });
    });
});

describe('inventoryActions', () => {
    it('clearInventorySearch() should create the SEARCH_INVENTORY_CLEAR action', (done) => {
        const expectedActions = [{ type: actionTypes.SEARCH_INVENTORY_CLEAR }];
        const store = mockStore({ inventorySearch: [] }, expectedActions, done);

        store.dispatch(actionCreators.clearInventorySearch());
        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toEqual(actionTypes.SEARCH_INVENTORY_CLEAR);
        done();
    });
});

describe('inventoryActions', () => {
    it('checkInOrRemoveInventory(item, count) should create the TASK_BEGIN, REQUEST_UPDATE_INVENTORY_ITEM_CLEARED, CHECK_IN_OR_REMOVE_INVENTORY_SUCCESS and TASK_END actions', (done) => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '[{"id": 1}]')));

        const expectedActions = [
            { type: actionTypes.TASK_BEGIN },
            { type: actionTypes.REQUEST_UPDATE_INVENTORY_LIST_CLEARED },
            { type: actionTypes.CHECK_IN_OR_REMOVE_INVENTORY_SUCCESS, inventoryList: [] },
            { type: actionTypes.TASK_END }];
        const store = mockStore({ inventoryItem: { "id": 1 } }, expectedActions, done);

        store.dispatch(actionCreators.checkInOrRemoveInventory({"id": 1 }, 5)).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(4);
            expect(actions[0].type).toEqual(actionTypes.TASK_BEGIN);
            expect(actions[1].type).toEqual(actionTypes.REQUEST_UPDATE_INVENTORY_LIST_CLEARED);
            expect(actions[2].type).toEqual(actionTypes.CHECK_IN_OR_REMOVE_INVENTORY_SUCCESS);
            expect(actions[3].type).toEqual(actionTypes.TASK_END);
            done();
        });
    });
});

describe('inventoryActions', () => {
    it('updateInventoryItemDetails(item, count) should create the TASK_BEGIN, REQUEST_UPDATE_INVENTORY_ITEM_CLEARED, UPDATE_INVENTORY_DETAILS_SUCCESS and TASK_END actions', (done) => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '[{"id": 1}]')));

        const expectedActions = [
            { type: actionTypes.TASK_BEGIN },
            { type: actionTypes.REQUEST_UPDATE_INVENTORY_LIST_CLEARED },
            { type: actionTypes.UPDATE_INVENTORY_DETAILS_SUCCESS, inventoryList: [] },
            { type: actionTypes.TASK_END }];
        const store = mockStore({ inventoryItem: { "id": 1 } }, expectedActions, done);

        store.dispatch(actionCreators.updateInventoryItemDetails({ "id": 1 }, 5)).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(4);
            expect(actions[0].type).toEqual(actionTypes.TASK_BEGIN);
            expect(actions[1].type).toEqual(actionTypes.REQUEST_UPDATE_INVENTORY_LIST_CLEARED);
            expect(actions[2].type).toEqual(actionTypes.UPDATE_INVENTORY_DETAILS_SUCCESS);
            expect(actions[3].type).toEqual(actionTypes.TASK_END);
            done();
        });
    });
});

describe('inventoryActions', () => {
    it('createInventoryItem(item, count) should create the TASK_BEGIN, REQUEST_UPDATE_INVENTORY_ITEM_CLEARED, CREATE_INVENTORY_ITEM_SUCCESS and TASK_END actions', (done) => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '[{"id": 1}]')));

        const expectedActions = [
            { type: actionTypes.TASK_BEGIN },
            { type: actionTypes.REQUEST_UPDATE_INVENTORY_LIST_CLEARED },
            { type: actionTypes.CREATE_INVENTORY_ITEM_SUCCESS, inventoryList: [] },
            { type: actionTypes.TASK_END }];
        const store = mockStore({ inventoryItem: { "id": 1 } }, expectedActions, done);

        store.dispatch(actionCreators.createInventoryItem({ "id": 1 })).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(4);
            expect(actions[0].type).toEqual(actionTypes.TASK_BEGIN);
            expect(actions[1].type).toEqual(actionTypes.REQUEST_UPDATE_INVENTORY_LIST_CLEARED);
            expect(actions[2].type).toEqual(actionTypes.CREATE_INVENTORY_ITEM_SUCCESS);
            expect(actions[3].type).toEqual(actionTypes.TASK_END);
            done();
        });
    });
});