import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchFromApi from './fetchFromApi';
import * as data from "../data/mockdb.json";
import 'whatwg-fetch';

const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
        status,
        statusText,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

describe('fetchFromApi',
    () => {
        it('fetchFromInventoryApi(resource) should fetch data',
            (done) => {
                window.fetch = jest.fn().mockImplementation(() =>
                    Promise.resolve(mockResponse(200, null, JSON.stringify(data.inventory))));
                fetchFromApi.fetchFromInventoryApi("inventory").then(
                    response => {
                        return response.json();
                    }).then(result => {
                        expect(result.length).toBe(3);
                        done();
                });
            });
    });