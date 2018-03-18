import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Label, Popup, Table } from "semantic-ui-react";
import {dateFormatter} from "../formatters/dateFormatter";

/**
 * A component for displaying the inventory list row
 * @param {any} param0
 */
const InventoryListRow = ({ item, itemSelectedHandler, itemDeleteHandler }) => {
    const handleSelect = () => {
        itemSelectedHandler(item);
    };

    const handleDelete = () => {
        itemDeleteHandler(item);
    };

    return (
        <Table.Row positive={item.currentCount >= 10} warning={item.currentCount > 4 && item.currentCount <= 9} negative={item.currentCount <= 4}>
            <Table.Cell onClick={handleSelect} style={{ cursor: "pointer" }}>
                <Label ribbon={item.currentCount < 1} color="red" className={item.currentCount > 0 ? "hidden": ""}>
                    Out of stock!
                </Label>
                {item.name}
            </Table.Cell>
            <Table.Cell onClick={handleSelect} style={{ cursor: "pointer" }}>{item.currentCount}</Table.Cell>
            <Table.Cell onClick={handleSelect} style={{ cursor: "pointer" }}>{dateFormatter(new Date(item.timestamp))}</Table.Cell>
            <Table.Cell>
                <Popup trigger={<Icon as="i" style={{ cursor: "pointer", fontSize: "1.5em", marginLeft: "1em" }} className="fas fa-trash" onClick={handleDelete} />} content="Remove inventory item" />
            </Table.Cell>
        </Table.Row>
    );
};

/**
 * Defines the properties for the component
 */
InventoryListRow.propTypes = {
    item: PropTypes.object.isRequired,
    itemSelectedHandler: PropTypes.func.isRequired,
    itemDeleteHandler: PropTypes.func.isRequired
};

export default InventoryListRow;