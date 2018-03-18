import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as inventoryActions from "../../actions/inventoryActions";
import * as successActions from "../../actions/successActions";
import EditInventoryItem from "../EditInventoryItem";
import InventoryList from "../InventoryList";
import InventorySearch from "../InventorySearch";
import ConfirmCloseDirtyItem from "../ConfirmCloseDirtyItem";
import CreateInventoryItem from "../CreateInventoryItem";
import { Button, Container, Grid, Header, Icon, Segment, Sidebar } from "semantic-ui-react";
import * as toastOptions from "../../constants/toast";

/**
 * InventoryPage container component
 * @extends {React.Component}
 */
export class InventoryPage extends React.Component {
    /**
     * Creates a new inventoryListPage
     * @constructor
     * @param {Object} props The component properties
     * @param {Object} context The component context
     */
    constructor(props, context) {
        super(props, context);

        // configure state
        this.state = {
            item: null,
            addRemoveCount: 0,
            isCountDirty: false,
            areDetailsDirty: false,
            showDirtyItemConfirmCloseModal: false,
            showCreateItemModal: false
        };

        // bind handlers
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.updateInventoryList = this.updateInventoryList.bind(this);
        this.handleItemSelected = this.handleItemSelected.bind(this);
        this.handleItemDeactivated = this.handleItemDeactivated.bind(this);
        this.handleCloseEditItem = this.handleCloseEditItem.bind(this);
        this.handleSearchItemSelected = this.handleSearchItemSelected.bind(this);
        this.handleUpdateItemName = this.handleUpdateItemName.bind(this);
        this.handleAddInventory = this.handleAddInventory.bind(this);
        this.handleRemoveInventory = this.handleRemoveInventory.bind(this);
        this.handleSaveAddRemoveInventory = this.handleSaveAddRemoveInventory.bind(this);
        this.handleSaveInventoryDetails = this.handleSaveInventoryDetails.bind(this);
        this.handleDirtyItemConfirmCloseModal = this.handleDirtyItemConfirmCloseModal.bind(this);
        this.handleDirtyItemCancelCloseModal = this.handleDirtyItemCancelCloseModal.bind(this);
        this.handleCreateInventoryItemConfirm = this.handleCreateInventoryItemConfirm.bind(this);
        this.handleCreateInventoryItemCancel = this.handleCreateInventoryItemCancel.bind(this);
        this.handleCreateInventoryItem = this.handleCreateInventoryItem.bind(this);
        this.handleRefreshItemDetails = this.handleRefreshItemDetails.bind(this);
        this.handleRefreshItemCount = this.handleRefreshItemCount.bind(this);
    }

    /**
     * Invoked immediately after mounting occurs
     * @returns {undefined}
     */
    componentDidMount() {
        this.props.inventoryActions.subscribeForInventoryListUpdates();
        this.props.inventoryActions.fetchInventoryList();
    }

    /**
     * Invoked when the component receives new properties
     * @param {any} nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.inventoryListUpdateRequest !== this.props.inventoryListUpdateRequest &&
            nextProps.inventoryListUpdateRequest !== null) {
            this.props.inventoryActions.fetchInventoryList();
            let item = null;
            if (nextProps.inventoryActions.responseType === "ItemsCheckedInToInventory" &&
                this.state.item !== undefined &&
                this.state.item !== null) {
                item = Object.assign({}, this.state.item);
                item.currentCount += nextProps.inventoryActions.count;
            } else if (nextProps.inventoryActions.responseType === "ItemsRemovedFromInventory" &&
                this.state.item !== undefined &&
                this.state.item !== null) {
                item = Object.assign({}, this.state.item);
                item.currentCount -= nextProps.inventoryActions.count;
            }
        }
        if (nextProps.inventoryItem !== this.props.inventoryItem &&
            nextProps.inventoryItem !== null) {
            this.setState({ item: nextProps.inventoryItem, addRemoveCount: 0, isCountDirty: false, areDetailsDirty: false });
        }
        if ((nextProps.inventoryItemCreated !== this.props.inventoryItemCreated && nextProps.inventoryItemCreated)
            || (nextProps.inventoryItemDeactivated !== this.props.inventoryItemDeactivated && nextProps.inventoryItemDeactivated)) {
            setTimeout(function () { this.props.successActions.clearSuccess(); }.bind(this), toastOptions.TOAST_TIMEOUT);
        }
    }

    /**
     * Invoked before the component unmounts
     */
    componentWillUnmount() {
        this.props.inventoryActions.unsubscribeForInventoryListUpdates();
    }

    /**
     * Updates the inventory list
     */
    updateInventoryList() {
        this.props.inventoryActions.fetchInventoryList();
    }

    /**
     * Handles the search change
     * @param {any} e
     */
    handleSearchChange(e) {
        this.props.inventoryActions.searchInventoryList(e.target.value, 5);
    }

    /**
     * Handles the item selection
     * @param {any} item
     */
    handleItemSelected(item) {
        this.props.inventoryActions.fetchInventoryItem(item.id);
        this.props.inventoryActions.subscribeForInventoryItemUpdates(item.id);
    }

    /**
     * Handles the search item selection
     * @param {any} item The item
     * @param {any} data The data
     */
    handleSearchItemSelected(item, data) {
        this.props.inventoryActions.fetchInventoryItem(data.results[0].id);
        this.props.inventoryActions.subscribeForInventoryItemUpdates(item.id);
    }

    /**
     * Handles the item deactivation
     * @param {any} item
     */
    handleItemDeactivated(item) {
        this.props.inventoryActions.deactivateInventoryItem(item);
    }

    /**
     * Handles closing the edit item
     * @param {any} noWarn
     */
    handleCloseEditItem(noWarn) {

        if ((this.state.isCountDirty || this.state.areDetailsDirty)
            && (noWarn === undefined || noWarn === false)) {
            this.setState({ showDirtyItemConfirmCloseModal: true });
            return;
        }

        this.props.inventoryActions.clearInventoryItem();
        this.props.inventoryActions.unsubscribeForInventoryItemUpdates();
        this.setState({item: null, count: 0});
    }

    /**
     * Handles updating the item name
     * @param {any} e
     * @param {any} data
     */
    handleUpdateItemName(e, data) {
        let item = {};
        if (this.state.item !== null) {
            item = Object.assign({}, this.state.item);
        }

        item.name = data.value;
        let existingItemName = null;

        if (this.props.inventoryItem !== null) {
            existingItemName = this.props.inventoryItem.name;
        }

        this.setState({ item: item, areDetailsDirty: item.name !== existingItemName });
    }

    /**
     * Handles saving the inventory details
     * @param {any} item
     */
    handleSaveInventoryDetails(item) {
        this.props.inventoryActions.updateInventoryItemDetails(item);
        this.setState({ addRemoveCount: 0 });
    }

    /**
     * Handles adding inventory
     */
    handleAddInventory() {
        let count = this.state.addRemoveCount;
        count++;
        this.setState({ addRemoveCount: count, isCountDirty: count !== 0 });
    }

    /**
     * Handles removing inventory
     */
    handleRemoveInventory() {
        let count = this.state.addRemoveCount;
        count--;

        this.setState({ addRemoveCount: count, isCountDirty: count !== 0 });
    }

    /**
     * Hanldles saving the add or remove inventory
     * @param {any} item The item to save
     * @param {any} count The count to add or remove
     */
    handleSaveAddRemoveInventory(item, count) {
        this.props.inventoryActions.checkInOrRemoveInventory(item, count);
        this.setState({ addRemoveCount: 0});
    }

    /**
     * Handles the dirty item confirm close modal
     */
    handleDirtyItemConfirmCloseModal() {
        this.setState(
            { item: null, addRemoveCount: 0, isCountDirty: false, areDetailsDirty: false, showDirtyItemConfirmCloseModal: false });
        this.props.inventoryActions.clearInventoryItem();
        this.props.inventoryActions.unsubscribeForInventoryItemUpdates();
    }

    /**
     * Handles the dirty item cancel close modal
     */
    handleDirtyItemCancelCloseModal() {
        this.setState({ showDirtyItemConfirmCloseModal: false });
    }

    /**
     * Handles the create inventory item confirmation
     * @param {any} item
     */
    handleCreateInventoryItemConfirm(item) {
        this.props.inventoryActions.createInventoryItem(item);
        this.setState({ item: null, showCreateItemModal: false });
    }

    /**
     * Handles the create inventory item cancellation
     */
    handleCreateInventoryItemCancel() {
        this.setState({ item: null, showCreateItemModal: false });
    }

    /**
     * Handles the create inventory item
     */
    handleCreateInventoryItem() {
        this.setState({ item: { name: "" }, showCreateItemModal: true });
    }

    /**
     * Handles refreshing the item details
     * @param {any} inventoryItemUpdateRequest
     */
    handleRefreshItemDetails(inventoryItemUpdateRequest) {
        const item = Object.assign({}, this.state.item);
        item.name = inventoryItemUpdateRequest.response.newName;
        item.version = inventoryItemUpdateRequest.response.version;
        this.setState({ item: item, areDetailsDirty: false });
        this.props.inventoryActions.clearInventoryItemUpdateRequest();
    }

    /**
     * Handles refreshing the item count
     * @param {any} inventoryItemUpdateRequest
     */
    handleRefreshItemCount(inventoryItemUpdateRequest) {
        const item = Object.assign({}, this.state.item);
        item.count = inventoryItemUpdateRequest.response.count;
        item.version = inventoryItemUpdateRequest.response.version;
        this.setState({ item: item, isCountDirty: false });
        this.props.inventoryActions.clearInventoryItemUpdateRequest();
    }

    /**
     * Render a React element
     * @returns {Object} A reference to the component
     */
    render() {
        const isEditItemOpen = this.props.inventoryItem !== null;
        let toastMessage = "";
        if (this.props.inventoryItemCreated) {
            toastMessage = "Your item was successfully created.";
        }

        if (this.props.inventoryItemDeactivated) {
            toastMessage = "Your item was successfully deleted";
        }

        let showToast = false;
        if (this.props.inventoryItemCreated || this.props.inventoryItemDeactivated) {
            showToast = true;
        }

        return (
            <div>
                <Sidebar as={Container} style={{ paddingTop: "0.5em", paddingBottom: "0.5em", backgroundColor: "#21ba45", color: "#FFFFFF", fontSize: "2em" }} animation="overlay" direction="top" visible={showToast}>
                    <span style={{ marginLeft: "2em" }}><Icon className="fas fa-check-circle" />{toastMessage}</span>
                </Sidebar>
                <Segment>
                    <Header>Inventory Management Example</Header>
                    <div style={{marginBottom: "6em", marginTop: "2em"}}>
                        <div style={{ float: "left" }}>
                            <InventorySearch
                                searchHandler={this.handleSearchChange}
                                results={this.props.inventorySearch}
                                itemSelectedHandler={this.handleSearchItemSelected} />
                        </div>
                        <div style={{float: "right"}}>
                            <Button icon="add circle" positive labelPosition="right" content="Create new inventory item" onClick={this.handleCreateInventoryItem} />
                        </div>
                    </div>
                    <InventoryList
                        inventories={this.props.inventoryList}
                        itemSelectedHandler={this.handleItemSelected}
                        itemDeleteHandler={this.handleItemDeactivated} />
                    <EditInventoryItem
                        inventoryCounter={this.state.addRemoveCount}
                        inventoryItemUpdateRequest={this.props.inventoryItemUpdateRequest}
                        item={this.state.item}
                        open={isEditItemOpen}
                        handleClose={this.handleCloseEditItem}
                        handleUpdateName={this.handleUpdateItemName}
                        handleAddInventory={this.handleAddInventory}
                        handleRemoveInventory={this.handleRemoveInventory}
                        handleSaveAddRemoveInventory={this.handleSaveAddRemoveInventory}
                        handleSaveInventoryDetails={this.handleSaveInventoryDetails}
                        handleRefreshItemCount={this.handleRefreshItemCount}
                        handleRefreshItemDetails={this.handleRefreshItemDetails}
                        isCountDirty={this.state.isCountDirty}
                        areDetailsDirty={this.state.areDetailsDirty} />
                    <ConfirmCloseDirtyItem
                        handleCloseCancel={this.handleDirtyItemCancelCloseModal}
                        handleCloseConfirm={this.handleDirtyItemConfirmCloseModal}
                        open={this.state.showDirtyItemConfirmCloseModal} />
                    <CreateInventoryItem
                        item={this.state.item}
                        open={this.state.showCreateItemModal}
                        handleClose={this.handleCreateInventoryItemCancel}
                        handleUpdateName={this.handleUpdateItemName}
                        handleCreateInventoryItem={this.handleCreateInventoryItemConfirm}
                        areDetailsDirty={this.state.areDetailsDirty} />
                </Segment>
            </div>
        );
    }
}

/**
 * Defines the properties for the component
 */
InventoryPage.propTypes = {
    inventoryActions: PropTypes.object,
    inventoryItem: PropTypes.object,
    inventoryItemCreated: PropTypes.bool,
    inventoryItemDeactivated: PropTypes.bool,
    inventoryItemUpdateRequest: PropTypes.object,
    inventoryList: PropTypes.array,
    inventoryListUpdateRequest: PropTypes.string,
    inventorySearch: PropTypes.array,
    successActions: PropTypes.object
};

/**
 * Maps items from state to properties of the component
 * @param {Object} state The state
 * @returns {Object} An object containing properties that the component can access
 */
function mapStateToProps(state) {
    const inventoryList = state.inventoryList;
    return {
        inventoryItem: state.inventoryItem,
        inventoryList: inventoryList,
        inventoryItemCreated: state.inventoryItemCreated,
        inventoryItemDeactivated: state.inventoryItemDeactivated,
        inventoryItemUpdateRequest: state.inventoryItemUpdateRequest,
        inventoryListUpdateRequest: state.inventoryListUpdateRequest,
        inventorySearch: state.inventorySearch
    };
}

/**
 * Binds actions to the dispatcher
 * @param {Object} dispatch The action dispatcher
 * @returns {Object} An object containing properties that the component can access
 */
function mapDispatchToProps(dispatch) {
    return {
        inventoryActions: bindActionCreators(inventoryActions, dispatch),
        successActions: bindActionCreators(successActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage);