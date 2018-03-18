// Set up your root reducer here...
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import errorResponse from "./errorResponse";
import inventoryItem from "./inventoryItem";
import inventoryItemCreated from "./inventoryItemCreated";
import inventoryItemDeactivated from "./inventoryItemDeactivated";
import inventoryItemUpdated from "./inventoryItemUpdated";
import inventoryItemUpdateRequest from "./inventoryItemUpdateRequest";
import inventoryList from "./inventoryList";
import inventoryListUpdateRequest from "./inventoryListUpdateRequest";
import inventorySearch from "./inventorySearch";
import pendingTasks from "./pendingTasks";

/**
 * The parent or root reducer that combines all other reducers to form a single state store
 */
const rootReducer = combineReducers({
    form: formReducer,
    routing: routerReducer,

    errorResponse,
    inventoryItem,
    inventoryItemCreated,
    inventoryItemDeactivated,
    inventoryItemUpdated,
    inventoryItemUpdateRequest,
    inventoryList,
    inventoryListUpdateRequest,
    inventorySearch,
    pendingTasks
});

export default rootReducer;