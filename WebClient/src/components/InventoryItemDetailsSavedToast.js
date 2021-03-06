﻿import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Dimmer, Grid, Icon, Input, Label, Modal, Segment, Sidebar } from "semantic-ui-react";
import * as toastOptions from "../constants/toast";

/**
 * A component notifying the user that the inventory item details were saved successfully.
 * @param {any} param0
 */
const InventoryItemDetailsSavedToast = ({
    areDetailsDirty,
    handleRefreshItemDetails,
    inventoryItemUpdateRequest,
    item
}) => {

    let showToast = false;
    if (inventoryItemUpdateRequest != null &&
        inventoryItemUpdateRequest.responseType.toLowerCase() === "inventoryitemrenamed"
        && inventoryItemUpdateRequest.response.version !== item.version
        && inventoryItemUpdateRequest.response.newName === item.name
        && areDetailsDirty) {

        setTimeout(function () { handleRefreshItemDetails(inventoryItemUpdateRequest); }.bind(this),
            toastOptions.TOAST_TIMEOUT);
        showToast = true;
    }

    return (
        <Sidebar as={Container} style={{
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
            backgroundColor: "#21ba45",
            color: "#FFFFFF",
            fontSize: "2em"
        }} animation="uncover" direction="top" visible={showToast}>
            <div style={{ margin: "0.5em", marginBottom: "0" }}><Icon className="fas fa-check-circle" />
                <span style={{ fontSize: "0.75em" }}>Your update was successful!</span>
            </div>
        </Sidebar>
    );
};

/**
 * Defines the properties for the component
 */
InventoryItemDetailsSavedToast.propTypes = {
    areDetailsDirty: PropTypes.bool.isRequired,
    handleRefreshItemDetails: PropTypes.func.isRequired,
    inventoryItemUpdateRequest: PropTypes.object,
    item: PropTypes.object
};

export default InventoryItemDetailsSavedToast;