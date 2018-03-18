import React from "react";
import PropTypes from "prop-types";
import InventoryItemDeactivatedToast from "./InventoryItemDeactivatedToast";
import DirtyInventoryItemDetailsRefreshToast from "./DirtyInventoryItemDetailsRefreshToast";
import InventoryItemDetailsRefreshToast from "./InventoryItemDetailsRefreshToast";
import InventoryItemDetailsSavedToast from "./InventoryItemDetailsSavedToast";
import InventoryItemCountRefreshToast from "./InventoryItemCountRefreshToast";
import InventoryItemCountSavedToast from "./InventoryItemCountSavedToast";
import { Button, Container, Dimmer, Grid, Icon, Input, Label, Modal, Segment, Sidebar } from "semantic-ui-react";

/**
 * A component allowing a user to edit an inventory item
 * @param {any} param0
 */
const EditInventoryItem = ({
    item,
    open,
    handleClose,
    handleUpdateName,
    handleAddInventory,
    handleRefreshItemCount,
    handleRefreshItemDetails,
    handleRemoveInventory,
    handleSaveAddRemoveInventory,
    handleSaveInventoryDetails,
    inventoryCounter,
    inventoryItemUpdateRequest,
    isCountDirty,
    areDetailsDirty
}) => {
    const handleSaveAddRemove = () => {
        handleSaveAddRemoveInventory(item, inventoryCounter);
    };

    const handleSaveDetails = () => {
        handleSaveInventoryDetails(item);
    };

    return (
        <Modal dimmer="blurring" open={open} onClose={handleClose}>
            <Modal.Header>
                <Icon as="i" className="far fa-edit" color="blue" style={{ marginRight: "1em" }} />
                Edit inventory item
            </Modal.Header>
            <Modal.Content>
                <DirtyInventoryItemDetailsRefreshToast
                    areDetailsDirty={areDetailsDirty}
                    handleRefreshItemDetails={handleRefreshItemDetails}
                    handleCloseItem={handleClose}
                    inventoryItemUpdateRequest={inventoryItemUpdateRequest}
                    item={item} />
                <InventoryItemDeactivatedToast
                    handleCloseItem={handleClose}
                    inventoryItemUpdateRequest={inventoryItemUpdateRequest}
                    item={item} />
                <InventoryItemDetailsRefreshToast
                    areDetailsDirty={areDetailsDirty}
                    handleRefreshItemDetails={handleRefreshItemDetails}
                    inventoryItemUpdateRequest={inventoryItemUpdateRequest}
                    item={item} />
                <InventoryItemDetailsSavedToast
                    areDetailsDirty={areDetailsDirty}
                    handleRefreshItemDetails={handleRefreshItemDetails}
                    inventoryItemUpdateRequest={inventoryItemUpdateRequest}
                    item={item} />
                <InventoryItemCountRefreshToast
                    isCountDirty={isCountDirty}
                    handleRefreshItemCount={handleRefreshItemCount}
                    inventoryItemUpdateRequest={inventoryItemUpdateRequest}
                    item={item} />
                <InventoryItemCountSavedToast
                    isCountDirty={isCountDirty}
                    handleRefreshItemCount={handleRefreshItemCount}
                    inventoryItemUpdateRequest={inventoryItemUpdateRequest}
                    item={item} />
                <Modal.Description>
                    <p>Use the controls below to modify this inventory item.</p>
                    <Segment raised>
                        <Label color="blue" ribbon>Change item name</Label>
                        <div style={{marginTop: "1em"}}>
                            <Input value={(item !== undefined && item !== null) ? item.name : ""} onChange={handleUpdateName} disabled={inventoryItemUpdateRequest != null} />
                            <Button attached="right" onClick={handleSaveDetails} disabled={inventoryItemUpdateRequest != null} icon>
                                <Icon name="save" />
                                Save
                            </Button>
                        </div>
                    </Segment>
                    <Segment raised>
                        <Label color="blue" ribbon>Add/Remove inventory</Label>
                        <div style={{ marginTop: "1em" }}>
                            <Button color="red" attached="left" icon="minus" onClick={handleRemoveInventory} disabled={inventoryItemUpdateRequest != null}/>
                            <Input value={inventoryCounter} style={{ textAlign: "center" }} disabled={inventoryItemUpdateRequest != null}>
                                <input maxLength="4" size="10" />
                            </Input>
                            <Button color="green" attached="right" icon="plus" onClick={handleAddInventory} disabled={inventoryItemUpdateRequest != null}/>
                            <Button attached="right" onClick={handleSaveAddRemove} disabled={inventoryItemUpdateRequest != null} icon>
                                <Icon name="save" />
                                Save
                            </Button>
                        </div>
                    </Segment>
                    </Modal.Description>
                <Modal.Actions>
                    <Button icon="checkmark" labelPosition="right" content="Done" onClick={handleClose} />
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    );
};

/**
 * Defines the properties for the component
 */
EditInventoryItem.propTypes = {
    item: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleUpdateName: PropTypes.func.isRequired,
    handleAddInventory: PropTypes.func.isRequired,
    handleRefreshItemCount: PropTypes.func.isRequired,
    handleRefreshItemDetails: PropTypes.func.isRequired,
    handleRemoveInventory: PropTypes.func.isRequired,
    handleSaveAddRemoveInventory: PropTypes.func.isRequired,
    handleSaveInventoryDetails: PropTypes.func.isRequired,
    isCountDirty: PropTypes.bool.isRequired,
    areDetailsDirty: PropTypes.bool.isRequired,
    inventoryCounter: PropTypes.number.isRequired,
    inventoryItemUpdateRequest: PropTypes.object
};

export default EditInventoryItem;