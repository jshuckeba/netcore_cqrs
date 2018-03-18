import 'whatwg-fetch';
import * as helpers from "./helpers";

const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
        status,
        statusText,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

describe('helpers',
    () => {
        it('isErrorResponse(responseBody) should return true if error',
            (done) => {
                window.fetch = jest.fn().mockImplementation(() =>
                    Promise.resolve(mockResponse(200, null, '{"errorCode": 500 }')));
                fetch("").then(response => {
                    return response.json();
                }).then(result => {
                    const isError = helpers.isErrorResponse(result);
                    expect(isError).toBe(true);
                    done();
                });
            });
    });

describe('helpers',
    () => {
        it('isErrorResponse(responseBody) should return false if no error',
            (done) => {
                window.fetch = jest.fn().mockImplementation(() =>
                    Promise.resolve(mockResponse(200, null, '{}')));
                fetch("").then(response => {
                    return response.json();
                }).then(result => {
                    const isError = helpers.isErrorResponse(result);
                    expect(isError).toBe(false);
                    done();
                });
            });
    });

