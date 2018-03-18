import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Dimmer, Grid, Icon, Input, Label, Modal, Segment, Sidebar } from "semantic-ui-react";
import * as toastOptions from "../constants/toast";

/**
 * A component notifying the user that someone else renamed the current inventory item
 * @param {any} param0
 */
const InventoryItemDetailsRefreshToast = ({
    areDetailsDirty,
    handleRefreshItemDetails,
    inventoryItemUpdateRequest,
    item
}) => {
    let showToast = false;

    if (inventoryItemUpdateRequest != null &&
        inventoryItemUpdateRequest.responseType.toLowerCase() === "inventoryitemrenamed" &&
        inventoryItemUpdateRequest.response.version !== item.version &&
        areDetailsDirty === false) {

        setTimeout(function() { handleRefreshItemDetails(inventoryItemUpdateRequest); }.bind(this),
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
                <span style={{ fontSize: "0.75em" }}>It looks like someone else renamed this item. We have updated it for you.</span>
            </div>
        </Sidebar>
    );
};

/**
 * Defines the properties for the component
 */
InventoryItemDetailsRefreshToast.propTypes = {
    areDetailsDirty: PropTypes.bool.isRequired,
    handleRefreshItemDetails: PropTypes.func.isRequired,
    inventoryItemUpdateRequest: PropTypes.object,
    item: PropTypes.object
};

export default InventoryItemDetailsRefreshToast;