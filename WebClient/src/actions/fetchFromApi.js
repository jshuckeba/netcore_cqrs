import urlJoin from 'url-join';
import 'whatwg-fetch';

/**
 * Fetch from the Inventory API, which uses the root URL specified by the ROOT_INVENTORY_API_URL environment variable.
 * In the dev environment, this variable is set in webpack.config.dev.js
 * @param {string} resource Path to the resource you wish to fetch
 * @param {Object} init An options object containing any custom settings that you want to apply to the request. See {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch} for more details.
 * @returns {Promise} A promise that resolves to the Response object representing the response to your request.
 */
export function fetchFromInventoryApi(resource, init = null) {

    // ReSharper disable once UseOfImplicitGlobalInFunctionScope
    const rootApiUrl = process.env.ROOT_INVENTORY_API_URL;
    const fullUrl = urlJoin(rootApiUrl, resource);

    return init ? fetch(fullUrl, init) : fetch(fullUrl);
}