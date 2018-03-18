namespace InventoryApi.Test.Controllers
{
    using InventoryApi.Controllers;
    using InventoryApi.ReadModel;
    using InventoryApi.ReadModel.Dtos;
    using Microsoft.AspNetCore.Mvc;
    using Mocks;
    using Models.RequestModels;
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using WriteModel.Commands;
    using Xunit;

    public class InventoryControllerTests
    {
        private const string itemId1 = "16b74014-1579-4afb-9f38-1ee77b020315";
        private const string itemId2 = "fc73f217-c958-4592-a8cd-10999aa63a52";
        private const string itemId3 = "4c7045d0-1f56-4321-b64a-596e613860b3";
        private const string itemId4 = "7a12c02a-292b-4c63-942b-32c9bfdb838d";
        private const string itemId5 = "35ca7fd1-f14f-4ff9-b197-caf5a68990c5";
        private const string itemId6 = "f84fd608-e765-40d7-a32f-ba3476b0defc";
        private const string filterItemName = "Item 1";

        [Fact]
        public async Task GetReturnsAllItemsWithNoParameters()
        {
            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var response = await target.Get(null, null) as OkObjectResult;
            Assert.NotNull(response);
            var result = response.Value as IEnumerable<InventoryItemListDto>;
            Assert.NotNull(result);
            var resultList = result?.ToList();
            Assert.Equal(6, resultList.Count());
            Assert.Equal(itemId1, resultList.FirstOrDefault()?.Id.ToString());
        }

        [Fact]
        public async Task GetReturnsFilteredItemsByFilterParameter()
        {
            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var response = await target.Get(filterItemName, null) as OkObjectResult;
            Assert.NotNull(response);
            var result = response.Value as IEnumerable<InventoryItemListDto>;
            Assert.NotNull(result);
            var resultList = result?.ToList();
            Assert.Single(resultList);
            Assert.Equal(itemId1, resultList.FirstOrDefault()?.Id.ToString());
        }

        [Fact]
        public async Task GetLimitsResturnedCollectionByCountParameter()
        {
            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var response = await target.Get(null, 1) as OkObjectResult;
            Assert.NotNull(response);
            var result = response.Value as IEnumerable<InventoryItemListDto>;
            Assert.NotNull(result);
            var resultList = result?.ToList();
            Assert.Single(resultList);
            Assert.Equal(itemId1, resultList.FirstOrDefault()?.Id.ToString());
        }

        [Fact]
        public async Task GetReturnsDetailItemForSpecifiedId()
        {
            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var response = await target.Get(new Guid(itemId1)) as OkObjectResult;
            Assert.NotNull(response);
            var result = response.Value as InventoryItemDetailsDto;
            Assert.NotNull(result);
            Assert.Equal(itemId1, result.Id.ToString());
        }

        [Fact]
        public async Task CreateInventoryItemSendsCreateInventoryItemCommand()
        {
            const string NewItemName = "New Item";
            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var commandSender = controllerInstance.Item2;
            var response = await target.CreateInventoryItem(
                new CreateInventoryItemRequest{Name=NewItemName}, 
                new CancellationToken(false)) as OkObjectResult;
            Assert.NotNull(response);
            var result = response.Value.ToString();
            Assert.NotNull(result);
            Assert.True(Guid.TryParse(result, out var id));
            Assert.NotEmpty(commandSender.Commands);
            var sentCommand = commandSender.Commands.FirstOrDefault() as CreateInventoryItem;
            Assert.NotNull(sentCommand);
            Assert.Equal(NewItemName, sentCommand.Name);
        }

        [Fact]
        public async Task ChangeItemDetailsSendsRenameInventoryItemCommand()
        {
            const string NewItemName = "New Item Name";
            var currentItem = BuildInventoryItemList().FirstOrDefault();
            var expectedVersion = 0;
            if (currentItem != null)
            {
                expectedVersion = currentItem.Version;
            }

            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var commandSender = controllerInstance.Item2;
            var response = await target.ChangeItemDetails(
                new Guid(itemId1),
                new ChangeItemDetailsRequest { Name=NewItemName, Version=expectedVersion },
                new CancellationToken(false)) as OkResult;
            Assert.NotNull(response);
            Assert.NotEmpty(commandSender.Commands);
            var sentCommand = commandSender.Commands.FirstOrDefault() as RenameInventoryItem;
            Assert.NotNull(sentCommand);
            Assert.Equal(NewItemName, sentCommand.NewName);
            Assert.Equal(expectedVersion, sentCommand.ExpectedVersion);
            Assert.Equal(itemId1, sentCommand.Id.ToString());
        }

        [Fact]
        public async Task DeactivateSendsDeactivateInventoryItemCommand()
        {
            var currentItem = BuildInventoryItemList().FirstOrDefault();
            var expectedVersion = 0;
            if (currentItem != null)
            {
                expectedVersion = currentItem.Version;
            }

            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var commandSender = controllerInstance.Item2;
            var response = await target.Deactivate(new Guid(itemId1),
                new VersionedRequest {Version=expectedVersion},
                new CancellationToken(false)) as OkResult;
            Assert.NotNull(response);
            Assert.NotEmpty(commandSender.Commands);
            var sentCommand = commandSender.Commands.FirstOrDefault() as DeactivateInventoryItem;
            Assert.NotNull(sentCommand);
            Assert.Equal(expectedVersion, sentCommand.ExpectedVersion);
            Assert.Equal(itemId1, sentCommand.Id.ToString());
        }

        [Fact]
        public async Task CheckInSendsCheckInItemsToInventoryCommand()
        {
            const int ItemsToAdd = 5;
            var currentItem = BuildInventoryItemList().FirstOrDefault();
            var expectedVersion = 0;
            if (currentItem != null)
            {
                expectedVersion = currentItem.Version;
            }

            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var commandSender = controllerInstance.Item2;
            var response = await target.CheckIn(new Guid(itemId1),
                new AddRemoveInventoryRequest { Number=ItemsToAdd, Version = expectedVersion },
                new CancellationToken(false)) as OkResult;
            Assert.NotNull(response);
            Assert.NotEmpty(commandSender.Commands);
            var sentCommand = commandSender.Commands.FirstOrDefault() as CheckInItemsToInventory;
            Assert.NotNull(sentCommand);
            Assert.Equal(expectedVersion, sentCommand.ExpectedVersion);
            Assert.Equal(itemId1, sentCommand.Id.ToString());
            Assert.Equal(ItemsToAdd, sentCommand.Count);
        }

        [Fact]
        public async Task RemoveSendsRemoveItemsFromInventoryCommand()
        {
            const int ItemsToRemove = 5;
            var currentItem = BuildInventoryItemList().FirstOrDefault();
            var expectedVersion = 0;
            if (currentItem != null)
            {
                expectedVersion = currentItem.Version;
            }

            var controllerInstance = GetInventoryControllerInstance();
            var target = controllerInstance.Item1;
            var commandSender = controllerInstance.Item2;
            var response = await target.Remove(new Guid(itemId1),
                new AddRemoveInventoryRequest { Number = ItemsToRemove, Version = expectedVersion },
                new CancellationToken(false)) as OkResult;
            Assert.NotNull(response);
            Assert.NotEmpty(commandSender.Commands);
            var sentCommand = commandSender.Commands.FirstOrDefault() as RemoveItemsFromInventory;
            Assert.NotNull(sentCommand);
            Assert.Equal(expectedVersion, sentCommand.ExpectedVersion);
            Assert.Equal(itemId1, sentCommand.Id.ToString());
            Assert.Equal(ItemsToRemove, sentCommand.Count);
        }

        private Tuple<InventoryController, MockCommandSender> GetInventoryControllerInstance()
        {
            var mockCommandSender = new MockCommandSender();

            var readModelFacadeMock = new Mock<IReadModelFacade>();
            readModelFacadeMock.Setup(x => x.GetInventoryItems(null, null))
                .ReturnsAsync(BuildInventoryItemList());
            readModelFacadeMock.Setup(x => x.GetInventoryItems(filterItemName, null))
                .ReturnsAsync(BuildInventoryItemList().Where(x => x.Name == filterItemName));
            readModelFacadeMock.Setup(x => x.GetInventoryItems(null, 1))
                .ReturnsAsync(BuildInventoryItemList().Take(1));
            readModelFacadeMock.Setup(x => x.GetInventoryItemDetails(new Guid(itemId1)))
                .ReturnsAsync(BuildInventoryItemDetailList().SingleOrDefault(x => x.Id == new Guid(itemId1)));

            var controller = new InventoryController(
                mockCommandSender,
                readModelFacadeMock.Object);

            return new Tuple<InventoryController, MockCommandSender>(controller, mockCommandSender);
        }

        private IEnumerable<InventoryItemListDto> BuildInventoryItemList()
        {
            return new List<InventoryItemListDto>
            {
                new InventoryItemListDto(new Guid(itemId1), "Item 1", 1),
                new InventoryItemListDto(new Guid(itemId2), "Item 2", 1),
                new InventoryItemListDto(new Guid(itemId3), "Item 3", 1),
                new InventoryItemListDto(new Guid(itemId4), "Item 4", 1),
                new InventoryItemListDto(new Guid(itemId5), "Item 5", 1),
                new InventoryItemListDto(new Guid(itemId6), "Item 6", 1)
            };
        }

        private IEnumerable<InventoryItemDetailsDto> BuildInventoryItemDetailList()
        {
            return new List<InventoryItemDetailsDto>
            {
                new InventoryItemDetailsDto(new Guid(itemId1), "Item 1", 5, 1),
                new InventoryItemDetailsDto(new Guid(itemId2), "Item 2", 5, 1),
                new InventoryItemDetailsDto(new Guid(itemId3), "Item 3", 5, 1),
                new InventoryItemDetailsDto(new Guid(itemId4), "Item 4", 5, 1),
                new InventoryItemDetailsDto(new Guid(itemId5), "Item 5", 5, 1),
                new InventoryItemDetailsDto(new Guid(itemId6), "Item 6", 5, 1)
            };
        }
    }
}
