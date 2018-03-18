import React from 'react';
import {shallow, mount} from 'enzyme';
import {InventoryPage} from './InventoryPage';
import { Dimmer, Sidebar } from "semantic-ui-react";
import * as toastOptions from "../../constants/toast";

describe('<InventoryPage />',
    () => {
        it('should call the fetchInventoryList action on inventoryListUpdateRequest',
            () => {
                let actionResult = false;
                const actions = {
                    fetchInventoryList: function () {
                        actionResult = true;
                        return [];
                    },
                    subscribeForInventoryListUpdates: function () { }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]}
                    inventoryListUpdateRequest={null}/>);
                wrapper.setProps({ inventoryListUpdateRequest: "Update" });

                expect(actionResult).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should set state when new inventoryItem',
            () => {
                const inventoryItem = { id: 1, name: "Item 1", currentCount: 5, timestamp: new Date() };

                const wrapper = shallow(<InventoryPage
                    inventoryItem={null}
                    inventoryList={[]}
                    inventoryListUpdateRequest={null} />);
                wrapper.setProps({ inventoryItem: inventoryItem });

                expect(wrapper.state().item).toEqual(inventoryItem);
                expect(wrapper.state().addRemoveCount).toEqual(0);
                expect(wrapper.state().isCountDirty).toEqual(false);
                expect(wrapper.state().areDetailsDirty).toEqual(false);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should clear succcess after toast timeout when item created',
            (done) => {
                let actionResult = false;
                const actions = {
                    clearSuccess: function () {
                        actionResult = true;
                    }
                };

                const wrapper = shallow(<InventoryPage
                    successActions={actions}
                    inventoryItemCreated={null}
                    inventoryList={[]} />);
                wrapper.setProps({ inventoryItemCreated: true });

                setTimeout(function() {
                    expect(actionResult).toEqual(true);
                    done();
                }, toastOptions.TOAST_TIMEOUT + 200);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should clear succcess after toast timeout when item deactivated',
            (done) => {
                let actionResult = false;
                const actions = {
                    clearSuccess: function () {
                        actionResult = true;
                    }
                };

                const wrapper = shallow(<InventoryPage
                    successActions={actions}
                    inventoryItemDeactivated={null}
                    inventoryList={[]} />);
                wrapper.setProps({ inventoryItemDeactivated: true });

                setTimeout(function () {
                    expect(actionResult).toEqual(true);
                    done();
                }, toastOptions.TOAST_TIMEOUT + 200);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should fetch inventory list on updateInventoryList',
            () => {
                let actionResult = false;
                const actions = {
                    fetchInventoryList: function () {
                        actionResult = true;
                        return [];
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.instance().updateInventoryList();

                expect(actionResult).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should search on handleSearchChange',
            () => {
                const expectedValue = "search";
                const expectedLimit = 5;
                let actionResult = false;
                const actions = {
                    searchInventoryList: function (value, limit) {
                        actionResult = true;
                        expect(value).toEqual(expectedValue);
                        expect(limit).toEqual(expectedLimit);
                        return [];
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.instance().handleSearchChange({ target: {value: expectedValue }});

                expect(actionResult).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should fetch inventory item and subscribe on handleItemSelected',
            () => {
                const expectedId = 1;
                let actionResults = [false, false];
                const actions = {
                    fetchInventoryItem: function (id) {
                        actionResults[0] = true;
                        expect(id).toEqual(expectedId);
                        return {"id": 1};
                    },
                    subscribeForInventoryItemUpdates: function (id) {
                        actionResults[1] = true;
                        expect(id).toEqual(expectedId);
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.instance().handleItemSelected({ "id": expectedId });

                expect(actionResults[0]).toEqual(true);
                expect(actionResults[1]).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should deactivate inventory item and subscribe on deactivateInventoryItem',
            () => {
                const expectedItem = {"id": 1}
                let actionResult = false;
                const actions = {
                    deactivateInventoryItem: function (item) {
                        actionResult = true;
                        expect(item).toEqual(expectedItem);
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.instance().handleItemDeactivated(expectedItem);

                expect(actionResult).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should set warning message state on handleCloseEditItem',
            () => {
                let actionResults = [false, false];
                const actions = {
                    clearInventoryItem: function (item) {
                        actionResults[0] = true;
                    },
                    unsubscribeForInventoryItemUpdates: function (item) {
                        actionResults[1] = true;
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.setState({ "isCountDirty": true });
                wrapper.instance().handleCloseEditItem();

                expect(wrapper.state().showDirtyItemConfirmCloseModal).toEqual(true);
                expect(actionResults[0]).toEqual(false);
                expect(actionResults[1]).toEqual(false);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should clear inventory item and unsubscribe on handleCloseEditItem',
            () => {
                let actionResults = [false, false];
                const actions = {
                    clearInventoryItem: function (item) {
                        actionResults[0] = true;
                    },
                    unsubscribeForInventoryItemUpdates: function (item) {
                        actionResults[1] = true;
                    }
                };
                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.setState({ "isCountDirty": true });
                wrapper.instance().handleCloseEditItem(true);

                expect(actionResults[0]).toEqual(true);
                expect(actionResults[1]).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should update state on handleUpdateItemName',
            () => {
                const expectedName = "Item 2";
                const currentItem = { "id": 1, "name": "Item 1" };
                const alteredItem = currentItem;
                const wrapper = shallow(<InventoryPage
                    inventoryItem={currentItem}
                    inventoryList={[]} />);
                wrapper.setState({ "item": alteredItem });

                wrapper.instance().handleUpdateItemName({}, {"value": expectedName});

                expect(wrapper.state().item.name).toEqual(expectedName);
                expect(wrapper.state().areDetailsDirty).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should update item details and set state on handleSaveInventoryDetails',
            () => {
                const expectedItem = { "id": 1 }
                let actionResult = false;
                const actions = {
                    updateInventoryItemDetails: function (item) {
                        actionResult = true;
                        expect(item).toEqual(expectedItem);
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.instance().handleSaveInventoryDetails(expectedItem);

                expect(wrapper.state().addRemoveCount).toEqual(0);
                expect(actionResult).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should set state on handleAddInventory',
            () => {
                const currentCount = 2;
                const expectedCount = currentCount + 1;

                const wrapper = shallow(<InventoryPage
                    inventoryList={[]} />);
                wrapper.setState({ addRemoveCount: currentCount });
                wrapper.instance().handleAddInventory();

                expect(wrapper.state().addRemoveCount).toEqual(expectedCount);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should set state on handleRemoveInventory',
            () => {
                const currentCount = 2;
                const expectedCount = currentCount - 1;

                const wrapper = shallow(<InventoryPage
                    inventoryList={[]} />);
                wrapper.setState({ addRemoveCount: currentCount });
                wrapper.instance().handleRemoveInventory();

                expect(wrapper.state().addRemoveCount).toEqual(expectedCount);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should check in or removev inventory and set state on handleSaveAddRemoveInventory',
            () => {
                const expectedItem = { "id": 1 };
                let actionResult = false;
                const actions = {
                    checkInOrRemoveInventory: function (item, count) {
                        actionResult = true;
                        expect(item).toEqual(expectedItem);
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.setState({ "addRemoveCount": 5 });
                wrapper.instance().handleSaveAddRemoveInventory(expectedItem, 3);

                expect(wrapper.state().addRemoveCount).toEqual(0);
                expect(actionResult).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should clear inventory item, unsubscribe and set state on handleDirtyItemConfirmCloseModal',
            () => {
                let actionResults = [false, false];
                const actions = {
                    clearInventoryItem: function (item) {
                        actionResults[0] = true;
                    },
                    unsubscribeForInventoryItemUpdates: function (item) {
                        actionResults[1] = true;
                    }
                };
                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);
                wrapper.setState({
                    "item": { "id": 1 },
                    "isCountDirty": true,
                    "areDetailsDirty": true,
                    "showDirtyItemConfirmCloseModal": true
                });

                wrapper.instance().handleDirtyItemConfirmCloseModal();

                expect(wrapper.state().item).toEqual(null);
                expect(wrapper.state().isCountDirty).toEqual(false);
                expect(wrapper.state().areDetailsDirty).toEqual(false);
                expect(wrapper.state().showDirtyItemConfirmCloseModal).toEqual(false);
                expect(actionResults[0]).toEqual(true);
                expect(actionResults[1]).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should set state on handleDirtyItemCancelCloseModal',
            () => {
                const wrapper = shallow(<InventoryPage
                    inventoryList={[]} />);
                wrapper.setState({ showDirtyItemConfirmCloseModal: true });
                wrapper.instance().handleDirtyItemCancelCloseModal();

                expect(wrapper.state().showDirtyItemConfirmCloseModal).toEqual(false);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should create invventory item and set state on handleCreateInventoryItemConfirm',
            () => {
                const expectedItem = { "id": 1 };
                let actionResult = false;
                const actions = {
                    createInventoryItem: function (item) {
                        actionResult = true;
                        expect(item).toEqual(expectedItem);
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);

                wrapper.setProps({ item: { "id": 2, "showCreateItemModal": true } });
                wrapper.instance().handleCreateInventoryItemConfirm(expectedItem);
                expect(wrapper.state().item).toEqual(null);
                expect(wrapper.state().showCreateItemModal).toEqual(false);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should set state on handleCreateInventoryItemCancel',
            () => {
                const wrapper = shallow(<InventoryPage
                    inventoryList={[]} />);
                wrapper.setState({ item: {"id": 1}, showCreateItemModal: true });
                wrapper.instance().handleCreateInventoryItemCancel();

                expect(wrapper.state().item).toEqual(null);
                expect(wrapper.state().showCreateItemModal).toEqual(false);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should set state on handleCreateInventoryItem',
            () => {
                const wrapper = shallow(<InventoryPage
                    inventoryList={[]} />);
                wrapper.setState({ item: { "name": "Test Item 1" }, showCreateItemModal: false });
                wrapper.instance().handleCreateInventoryItem();

                expect(wrapper.state().item.name).toEqual("");
                expect(wrapper.state().showCreateItemModal).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should clear inventory item update request and set state on handleRefreshItemDetails',
            () => {
                const currentItem = { "id": 1, "name": "Item 1", "version": 1 };
                const expectedItem = { "id": 1, "name": "Item 2", "version": 2 };
                const request = {
                    response: { "newName": expectedItem.name, "version": expectedItem.version }
                };

                let actionResult = false;
                const actions = {
                    clearInventoryItemUpdateRequest: function () {
                        actionResult = true;
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);

                wrapper.setState({ "item": currentItem, "areDetailsDirty": true });
                wrapper.instance().handleRefreshItemDetails(request);

                expect(wrapper.state().item).toEqual(expectedItem);
                expect(wrapper.state().areDetailsDirty).toEqual(false);
                expect(actionResult).toEqual(true);
            });
    });

describe('<InventoryPage />',
    () => {
        it('should clear inventory item update request and set state on handleRefreshItemCount',
            () => {
                const currentItem = { "id": 1, "count": 1, "version": 1 };
                const expectedItem = { "id": 1, "count": 2, "version": 2 };
                const request = {
                    response: expectedItem
                };

                let actionResult = false;
                const actions = {
                    clearInventoryItemUpdateRequest: function () {
                        actionResult = true;
                    }
                };

                const wrapper = shallow(<InventoryPage
                    inventoryActions={actions}
                    inventoryList={[]} />);

                wrapper.setState({ "item": currentItem, "isCountDirty": true });
                wrapper.instance().handleRefreshItemCount(request);

                expect(wrapper.state().item).toEqual(expectedItem);
                expect(wrapper.state().isCountDirty).toEqual(false);
                expect(actionResult).toEqual(true);
            });
    });