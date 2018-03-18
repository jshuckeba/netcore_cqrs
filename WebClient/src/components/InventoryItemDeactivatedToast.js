import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Dimmer, Grid, Icon, Input, Label, Modal, Segment, Sidebar } from "semantic-ui-react";

/**
 * A component notifying the user that someone else has deactivated the current inventory item
 * @param {any} param0
 */
const InventoryItemDeactivatedToast = ({
    handleCloseItem,
    inventoryItemUpdateRequest,
    item
}) => {
    let showToast = false;
    if (inventoryItemUpdateRequest != null &&
        inventoryItemUpdateRequest.responseType.toLowerCase() === "inventoryitemdeactivated") {
        showToast = true;
    }

    const handleCloseNoWarning = () => {
        handleCloseItem(true);
    };

    return (
        <Sidebar as={Container} style={{ paddingTop: "0.5em", paddingBottom: "0.5em", backgroundColor: "#db2828", color: "#FFFFFF", fontSize: "2em" }} animation="uncover" direction="top" visible={showToast}>
            <div style={{ margin: "0.5em", marginBottom: "0" }}><Icon className="fas fa-exclamation-circle" />
                <span style={{ fontSize: "0.75em" }}>Oh no! Somebody else deactivated this item and it is no longer available! You can no longer edit the item.</span>
            </div>
            <div style={{ margin: "0.5em", float: "right" }}>
                <Button onClick={handleCloseNoWarning} labelPosition="right" negative icon inverted>
                    <Icon name="exclamation circle" />
                    Please let me go choose another item to edit
                </Button>
            </div>
        </Sidebar>
    );
};

/**
 * Defines the properties for the component
 */
InventoryItemDeactivatedToast.propTypes = {
    handleCloseItem: PropTypes.func.isRequired,
    inventoryItemUpdateRequest: PropTypes.object,
    item: PropTypes.object
};

export default InventoryItemDeactivatedToast;