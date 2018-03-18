import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Dimmer, Grid, Icon, Input, Label, Modal, Segment, Sidebar } from "semantic-ui-react";
import * as toastOptions from "../constants/toast";

/**
 * A component notifying a user that the inventory item count has been updated by someone else
 * @param {any} param0
 */
const InventoryItemCountRefreshToast = ({
    isCountDirty,
    handleRefreshItemCount,
    inventoryItemUpdateRequest,
    item
}) => {
    let showToast = false;

    if (inventoryItemUpdateRequest != null &&
        (inventoryItemUpdateRequest.responseType.toLowerCase() === "itemscheckedintoinventory"
            || inventoryItemUpdateRequest.responseType.toLowerCase() === "itemsremovedfrominventory")
        && inventoryItemUpdateRequest.response.version !== item.version &&
        isCountDirty === false) {

        setTimeout(function () { handleRefreshItemCount(inventoryItemUpdateRequest); }.bind(this),
            toastOptions.TOAST_TIMEOUT);

        showToast = true;
    }

    return (
        <Sidebar as={Container} style={{
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
            backgroundColor: "#2185d0",
            color: "#FFFFFF",
            fontSize: "2em"
        }} animation="uncover" direction="top" visible={showToast}>
            <div style={{ margin: "0.5em", marginBottom: "0" }}><Icon className="fas fa-info-circle" />
                <span style={{ fontSize: "0.75em" }}>It looks like someone else changed the inventory count. We have updated it for you. There are now {item.currentCount} items.</span>
            </div>
        </Sidebar>
    );
};

/**
 * Defines the properties for the component
 */
InventoryItemCountRefreshToast.propTypes = {
    isCountDirty: PropTypes.bool.isRequired,
    handleRefreshItemCount: PropTypes.func.isRequired,
    inventoryItemUpdateRequest: PropTypes.object,
    item: PropTypes.object
};

export default InventoryItemCountRefreshToast;