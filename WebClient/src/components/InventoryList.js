import React from "react";
import PropTypes from "prop-types";
import InventoryListRow from "./InventoryListRow";
import { Table } from "semantic-ui-react";

/**
 * A component for displaying the inventory list
 * @param {any} param0
 */
const InventoryList = ({ inventories, itemSelectedHandler, itemDeleteHandler }) => {
    return (
        <Table celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Count</Table.HeaderCell>
                    <Table.HeaderCell>Last Updated</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {inventories.map(item =>
                    <InventoryListRow key={item.id} item={item} itemSelectedHandler={itemSelectedHandler}
                        itemDeleteHandler={itemDeleteHandler} />)}
            </Table.Body>
        </Table>
    );
};

/**
 * Defines the properties for the component
 */
InventoryList.propTypes = {
    inventories: PropTypes.array.isRequired,
    itemSelectedHandler: PropTypes.func.isRequired,
    itemDeleteHandler: PropTypes.func.isRequired
};

export default InventoryList;