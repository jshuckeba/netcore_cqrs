import React from "react";
import PropTypes from "prop-types";
import { Search } from "semantic-ui-react";

/**
 * A component for searching inventory items
 * @param {any} param0
 */
const InventorySearch = ({ searchHandler, results, itemSelectedHandler }) => {
    const searchResults = results.map((item) => { return { title: item.name, id: item.id }; });
    return (
        <Search onSearchChange={searchHandler} results={searchResults} onResultSelect={itemSelectedHandler}/>
    );
};

/**
 * Defines the properties for the component
 */
InventorySearch.propTypes = {
    searchHandler: PropTypes.func.isRequired,
    results: PropTypes.array,
    itemSelectedHandler: PropTypes.func.isRequired
};

export default InventorySearch;