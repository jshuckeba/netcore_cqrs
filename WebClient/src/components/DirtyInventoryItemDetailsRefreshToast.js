import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Dimmer, Grid, Icon, Input, Label, Modal, Segment, Sidebar } from "semantic-ui-react";

/**
 * A component notifying a user that a dirty inventory item has been altered by someone else
 * @param {any} param0
 */
const DirtyInventoryItemDetailsRefreshToast = ({
    areDetailsDirty,
    handleRefreshItemDetails,
    handleCloseItem,
    inventoryItemUpdateRequest,
    item
}) => {
    let showInventoryItemRenamedToast = false;
    if (inventoryItemUpdateRequest != null &&
        inventoryItemUpdateRequest.responseType.toLowerCase() === "inventoryitemrenamed"
        && inventoryItemUpdateRequest.response.newName !== item.name
        && areDetailsDirty) {
        showInventoryItemRenamedToast = true;
    }

    const handleCloseNoWarning = () => {
        handleCloseItem(true);
    };

    const handleRefresh = () => {
        handleRefreshItemDetails(inventoryItemUpdateRequest);
    };

    return (
        <Sidebar as={Container} style={{ paddingTop: "0.5em", paddingBottom: "0.5em", backgroundColor: "#fbbd08", color: "#FFFFFF", fontSize: "2em" }} animation="uncover" direction="top" visible={showInventoryItemRenamedToast}>
            <div style={{ margin: "0.5em", marginBottom: "0" }}><Icon className="fas fa-exclamation-triangle" />
                <span style={{ fontSize: "0.75em" }}>It looks like someone else renamed this item. Would you like to refresh the name or close this item?</span>
            </div>
            <div style={{ margin: "0.5em", float: "right" }}>
                <Button onClick={handleCloseNoWarning} negative>
                    No, close the item
                </Button>
                <Button onClick={handleRefresh} labelPosition="right" positive icon>
                    <Icon name="refresh" />
                    Please refresh the item name
                </Button>
            </div>
        </Sidebar>
    );
};

/**
 * Defines the properties for the component
 */
DirtyInventoryItemDetailsRefreshToast.propTypes = {
    areDetailsDirty: PropTypes.bool.isRequired,
    handleRefreshItemDetails: PropTypes.func.isRequired,
    handleCloseItem: PropTypes.func.isRequired,
    inventoryItemUpdateRequest: PropTypes.object,
    item: PropTypes.object
};

export default DirtyInventoryItemDetailsRefreshToast;