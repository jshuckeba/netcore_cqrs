import * as actions from "./actionTypes";
import urlJoin from "url-join";
import { fetchFromInventoryApi as fetch } from "./fetchFromApi";
import * as helpers from "./helpers";
import * as signalR from "@aspnet/signalr-client";

/**
 * The hub options for connecting with SignalR
 */
const hubOptions = {
    transport: signalR.TransportType.ServerSentEvents
};

/**
 * The inventory list hub connection.
 */
const inventoryListHubConnection = new signalR.HubConnection(
    // ReSharper disable once PossiblyUnassignedProperty
    urlJoin(process.env.ROOT_INVENTORY_API_URL, "/broadcastInventory?group=inventorylist"),
    hubOptions);

/**
 * The inventory item hub connection.
 */
let inventoryItemHubConnection = null;

/**
 * Fetches the inventory list
 * @returns {funtion} A function that returns a Promise.
 */
export function fetchInventoryList() {
    return function (dispatch) {
        dispatch({ type: actions.TASK_BEGIN });

        const url = "/inventory";

        return fetch(url).then(response => {
            return response.json();
        }).then(inventoryList => {
            if (helpers.isErrorResponse(inventoryList)) {
                return helpers.dispatchErrorAndEndTask(dispatch, actions.LOAD_INVENTORY_LIST_FAILURE, inventoryList);
            }

            dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_LIST_CLEARED });
            dispatch({ type: actions.LOAD_INVENTORY_LIST_SUCCESS, inventoryList });
            return dispatch({ type: actions.TASK_END });
        }).catch(error => {
            return helpers.dispatchErrorAndEndTask(dispatch, actions.LOAD_INVENTORY_LIST_FAILURE, null, error);
        });
    };
}

/**
 * Fetches the inventory item by the identifier.
 * @param {any} id The identifier.
 * @returns {funtion} A function that returns a Promise.
 */
export function fetchInventoryItem(id) {
    return function (dispatch) {
        dispatch({ type: actions.TASK_BEGIN });

        const url = `/inventory/${id}`;

        return fetch(url).then(response => {
            return response.json();
        }).then(inventoryItem => {
            if (helpers.isErrorResponse(inventoryItem)) {
                return helpers.dispatchErrorAndEndTask(dispatch, actions.LOAD_INVENTORY_ITEM_FAILURE, inventoryItem);
            }

            dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_ITEM_CLEARED });
            dispatch({ type: actions.LOAD_INVENTORY_ITEM_SUCCESS, inventoryItem });
            return dispatch({ type: actions.TASK_END });
        }).catch(error => {
            return helpers.dispatchErrorAndEndTask(dispatch, actions.LOAD_INVENTORY_ITEM_FAILURE, null, error);
        });
    };
}

/**
 * Clears the current inventory item from the store.
 * @returns {funtion} A function that returns a Promise.
 */
export function clearInventoryItem() {
    return function(dispatch) {
        dispatch({ type: actions.LOAD_INVENTORY_ITEM_CLEAR });
    };
}

/**
 * Searches the inventory item list.
 * @param {any} nameFilter The name to search on.
 * @param {any} size The size of the list to return.
 * @returns {funtion} A function that returns a Promise.
 */
export function searchInventoryList(nameFilter, size) {
    return function (dispatch) {
        let url = `/inventory?nameFilter=${nameFilter}`;

        if (size !== undefined) {
            url += `&size=${size}`;
        }

        return fetch(url).then(response => {
            return response.json();
        }).then(inventorySearch => {
            if (helpers.isErrorResponse(inventorySearch)) {
                return dispatch({ type: actions.SEARCH_INVENTORY_FAILURE, inventorySearch });
            }

            return dispatch({ type: actions.SEARCH_INVENTORY_SUCCESS, inventorySearch });
        }).catch(error => {
            return dispatch({ type: actions.SEARCH_INVENTORY_FAILURE, error });
        });
    };
}

/**
 * Clears the current inventory search from the store.
 * @returns {funtion} A function that returns a Promise.
 */
export function clearInventorySearch() {
    return function (dispatch) {

        return dispatch({ type: actions.SEARCH_INVENTORY_CLEAR });
    };
}

/**
 * Subscribes to the hub and receives inventory list updates.
 * @returns {funtion} A function that returns a Promise.
 */
export function subscribeForInventoryListUpdates() {
    return function (dispatch) {
        // subscribe to inventory messages
        inventoryListHubConnection.on('UpdateInventoryList',
            (inventoryListUpdateRequest) => {
                dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_LIST_INVOKED, inventoryListUpdateRequest });
            });

        inventoryListHubConnection.start();
    };
}

/**
 * Unsubscribes from inventory list updates and clears
 * the current update from the store.
 * @returns {funtion} A function that returns a Promise.
 */
export function unsubscribeForInventoryListUpdates() {
    return function (dispatch) {
        inventoryListHubConnection.stop();
        dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_LIST_CLEARED });
    };
}

/**
 * Subscribes for inventory item updates.
 * @param {any} id The identifier.
 * @returns {funtion} A function that returns a Promise.
 */
export function subscribeForInventoryItemUpdates(id) {
    const groupName = "inventoryitemdetail" + id.toLowerCase();

    // ReSharper disable once UseOfImplicitGlobalInFunctionScope
    inventoryItemHubConnection =
        new signalR.HubConnection(
            urlJoin(process.env.ROOT_INVENTORY_API_URL, `/broadcastInventory?group=${groupName}`),
            hubOptions);

    return function (dispatch) {

        // subscribe to inventory messages
        inventoryItemHubConnection.on('UpdateInventoryItemDetail',
            (inventoryItemUpdateRequest) => {
                dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_ITEM_INVOKED, inventoryItemUpdateRequest });
            });

        inventoryItemHubConnection.start();
    };
}

/**
 * Unsubscribes from inventory item updates and clears
 * the current update from the store.
 * @returns {funtion} A function that returns a Promise.
 */
export function unsubscribeForInventoryItemUpdates() {
    return function (dispatch) {
        inventoryItemHubConnection.stop();
        inventoryItemHubConnection = null;
        dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_ITEM_CLEARED });
    };
}

/**
 * Clears the current invventory item update request from the store.
 * @returns {funtion} A function that returns a Promise.
 */
export function clearInventoryItemUpdateRequest() {
    return function (dispatch) {
        dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_ITEM_CLEARED });
    };
}

/**
 * Deactivates the specified inventory item.
 * @param {any} item The item.
 * @returns {funtion} A function that returns a Promise.
 */
export function deactivateInventoryItem(item) {
    return function(dispatch) {
        dispatch({ type: actions.TASK_BEGIN });

        const url = `/inventory/deactivate/${item.id}`;

        return fetch(url,
            {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "DELETE",
                body: JSON.stringify(item)
            }).then(response => {
                return response.status;
        }).then(status => {
            if (status !== 200) {
                return helpers.dispatchErrorAndEndTask(dispatch, actions.DEACTIVATE_INVENTORY_ITEM_FAILURE, status);
            }

            dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_LIST_CLEARED });
            dispatch({ type: actions.DEACTIVATE_INVENTORY_ITEM_SUCCESS, success: true });
            return dispatch({ type: actions.TASK_END });
            }).catch(error => {
            return helpers.dispatchErrorAndEndTask(dispatch, actions.DEACTIVATE_INVENTORY_ITEM_FAILURE, null, error);
        });
    };
}

/**
 * Checks in or removes inventory for the specified item.
 * @param {any} item The item.
 * @param {any} count The count to add or remove (numbers less than 0 remove items).
 * @returns {funtion} A function that returns a Promise.
 */
export function checkInOrRemoveInventory(item, count) {
    return function (dispatch) {
        dispatch({ type: actions.TASK_BEGIN });

        let method = "PUT";
        let url = `/inventory/checkin/${item.id}`;

        if (count < 0) {
            url = `/inventory/remove/${item.id}`;
            count = -count;
        }

        const payload = {
            number: count,
            version: item.version
        };

        return fetch(url,
            {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: method,
                body: JSON.stringify(payload)
            }).then(response => {
            return response.status;
        }).then(status => {
            if (status !== 200) {
                return helpers.dispatchErrorAndEndTask(dispatch, actions.CHECK_IN_OR_REMOVE_INVENTORY_FAILURE, status);
            }

            dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_LIST_CLEARED });
            dispatch({ type: actions.CHECK_IN_OR_REMOVE_INVENTORY_SUCCESS });
            return dispatch({ type: actions.TASK_END });
        }).catch(error => {
            return helpers.dispatchErrorAndEndTask(dispatch, actions.CHECK_IN_OR_REMOVE_INVENTORY_FAILURE, null, error);
        });
    };
}

/**
 * Updates the specified inventory item details.
 * @param {any} item The item.
 * @returns {funtion} A function that returns a Promise.
 */
export function updateInventoryItemDetails(item) {
    return function (dispatch) {
        dispatch({ type: actions.TASK_BEGIN });

        const url = `/inventory/${item.id}`;

        const payload = {
            name: item.name,
            version: item.version
        };

        return fetch(url,
            {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "PUT",
                body: JSON.stringify(payload)
            }).then(response => {
            return response.status;
        }).then(status => {
            if (status !== 200) {
                return helpers.dispatchErrorAndEndTask(dispatch, actions.UPDATE_INVENTORY_DETAILS_FAILURE, status);
            }

            dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_LIST_CLEARED });
            dispatch({ type: actions.UPDATE_INVENTORY_DETAILS_SUCCESS });
            return dispatch({ type: actions.TASK_END });
        }).catch(error => {
            return helpers.dispatchErrorAndEndTask(dispatch, actions.UPDATE_INVENTORY_DETAILS_FAILURE, null, error);
        });
    };
}

/**
 * Creates a new inventory item with the specified details.
 * @param {any} item The item.
 * @returns {funtion} A function that returns a Promise.
 */
export function createInventoryItem(item) {
    return function (dispatch) {
        dispatch({ type: actions.TASK_BEGIN });

        const url = "/inventory";

        const payload = {
            name: item.name
        };

        return fetch(url,
            {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "POST",
                body: JSON.stringify(payload)
            }).then(response => {
            return response.status;
        }).then(status => {
            if (status !== 200) {
                return helpers.dispatchErrorAndEndTask(dispatch, actions.CREATE_INVENTORY_ITEM_FAILURE, status);
            }

            dispatch({ type: actions.REQUEST_UPDATE_INVENTORY_LIST_CLEARED });
            dispatch({ type: actions.CREATE_INVENTORY_ITEM_SUCCESS });
            return dispatch({ type: actions.TASK_END });
        }).catch(error => {
            return helpers.dispatchErrorAndEndTask(dispatch, actions.CREATE_INVENTORY_ITEM_FAILURE, null, error);
        });
    };
}



