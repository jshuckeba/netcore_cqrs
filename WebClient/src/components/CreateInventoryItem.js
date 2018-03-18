import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Icon, Input, Label, Modal, Segment } from "semantic-ui-react";

/**
 * A component allowing a user to create a new inventory item
 * @param {any} param0
 */
const CreateInventoryItem = ({
    item,
    open,
    handleClose,
    handleUpdateName,
    handleCreateInventoryItem,
    areDetailsDirty
}) => {
    const handleCreate = () => {
        handleCreateInventoryItem(item);
    };

    return (
        <Modal dimmer="blurring" open={open} onClose={handleClose}>
            <Modal.Header><Icon as="i" className="add circle" color="blue" style={{ marginRight: "1em" }}/>Create inventory item</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <p>Use the controls below to create a new inventory item.</p>
                    <Segment raised>
                        <Label color="blue" ribbon>New item name</Label>
                        <div style={{marginTop: "1em"}}>
                            <Input value={(item !== undefined && item !== null) ? item.name : ""} onChange={handleUpdateName} />
                        </div>
                    </Segment>
                </Modal.Description>
                <Modal.Actions>
                    <Button negative content="Cancel" onClick={handleClose} />
                    <Button icon="save" positive labelPosition="right" content="Save" disabled={!areDetailsDirty} onClick={handleCreate} />
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    );
};

/**
 * Defines the properties for the component
 */
CreateInventoryItem.propTypes = {
    item: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleUpdateName: PropTypes.func.isRequired,
    handleCreateInventoryItem: PropTypes.func.isRequired,
    areDetailsDirty: PropTypes.bool.isRequired
};

export default CreateInventoryItem;