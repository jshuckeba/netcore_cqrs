import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Modal } from "semantic-ui-react";

/**
 * A component allowing a user to confirm closing a dirty item
 * @param {any} param0
 */
const ConfirmCloseDirtyItem = ({
    handleCloseCancel,
    handleCloseConfirm,
    open
}) => {
    return (
        <Modal dimmer="blurring" open={open} onClose={handleCloseCancel} size="small">
            <Modal.Header><Icon color="yellow" as="i" className="far fa-warning" style={{marginRight: "1em"}} />Are you sure?</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <p>You have some changes which haven't been saved. Are you sure you're finished?</p>
                </Modal.Description>
                <Modal.Actions>
                    <Button negative content="No, I want to save my changes" onClick={handleCloseCancel} />
                    <Button icon="checkmark" positive labelPosition="right" content="Yes, I'm Sure" onClick={handleCloseConfirm} />
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    );
};

/**
 * Defines the properties for the component
 */
ConfirmCloseDirtyItem.propTypes = {
    handleCloseCancel: PropTypes.func.isRequired,
    handleCloseConfirm: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default ConfirmCloseDirtyItem;