namespace InventoryApi.Test.ReadModel.Handlers
{
    using Hubs;
    using InventoryApi.ReadModel.Dtos;
    using InventoryApi.ReadModel.Handlers;
    using InventoryApi.ReadModel.Infrastructure;
    using Moq;
    using Nest;
    using System;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using WriteModel.Events;
    using Xunit;

    public class InventoryItemDetailViewTests
    {
        private readonly Guid _itemId = Guid.NewGuid();

        private readonly string _itemName = "Item 1";

        private readonly string _newItemName = "New Item";

        private readonly DateTime _timeStamp = DateTime.Now;

        private readonly int _version = 0;

        private readonly Mock<ISearchResponse<InventoryItemDetailsDto>> _searchResponseMock;

        public InventoryItemDetailViewTests()
        {
            _searchResponseMock = new Mock<ISearchResponse<InventoryItemDetailsDto>>();
            _searchResponseMock.Setup(x => x.Documents)
                .Returns(new List<InventoryItemDetailsDto>
                {
                    new InventoryItemDetailsDto(_itemId, _itemName, 5, 0)
                });
        }

        [Fact]
        public async Task HandleHandlesInventoryItemCreated()
        {
            var repositoryMock = new Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>>();
            var hubMock = new Mock<InventoryHub>();

            var inventoryItemCreatedEvent = new InventoryItemCreated(_itemId, _itemName)
            {
                Version = _version,
                TimeStamp = _timeStamp
            };

            hubMock.Setup(x => x.SendUpdateInventoryItemDetailMessage(
                    _itemId, inventoryItemCreatedEvent))
                .Returns(Task.CompletedTask)
                .Verifiable();
            repositoryMock.Setup(x => x.AddOrUpdate(It.Is<InventoryItemDetailsDto>
                    (m => m.Name == _itemName 
                          && m.Version == _version 
                          && m.Id == _itemId
                          && m.Timestamp == _timeStamp)))
                .Returns(Task.CompletedTask)
                .Verifiable();

            var target = GetTarget(repositoryMock, hubMock);

            await target.Handle(inventoryItemCreatedEvent, new CancellationToken(false));
            repositoryMock.Verify();
            hubMock.Verify();
        }

        [Fact]
        public async Task HandleHandlesInventoryItemRenamed()
        {
            var repositoryMock = new Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>>();
            var hubMock = new Mock<InventoryHub>();

            var inventoryItemRenamedEvent = new InventoryItemRenamed(_itemId, _newItemName)
            {
                Version = _version,
                TimeStamp = _timeStamp
            };

            hubMock.Setup(x => x.SendUpdateInventoryItemDetailMessage(
                    _itemId, inventoryItemRenamedEvent))
                .Returns(Task.CompletedTask)
                .Verifiable();
            repositoryMock.Setup(x => x.AddOrUpdate(It.Is<InventoryItemDetailsDto>
                    (m => m.Name == _newItemName 
                          && m.Version == _version 
                          && m.Id == _itemId
                          && m.Timestamp == _timeStamp)))
                .Returns(Task.CompletedTask)
                .Verifiable();
            repositoryMock.Setup(x => x.GetById(_itemId))
                .ReturnsAsync(_searchResponseMock.Object);

            var target = GetTarget(repositoryMock, hubMock);

            await target.Handle(inventoryItemRenamedEvent, new CancellationToken(false));
            repositoryMock.Verify();
            hubMock.Verify();
        }

        [Fact]
        public async Task HandleHandlesItemsRemovedFromInventory()
        {
            var repositoryMock = new Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>>();
            var hubMock = new Mock<InventoryHub>();

            var itemsRemovedFromInventoryEvent = new ItemsRemovedFromInventory(_itemId, 5)
            {
                Version = _version,
                TimeStamp = _timeStamp
            };

            hubMock.Setup(x => x.SendUpdateInventoryItemDetailMessage(
                    _itemId, itemsRemovedFromInventoryEvent))
                .Returns(Task.CompletedTask)
                .Verifiable();
            repositoryMock.Setup(x => x.AddOrUpdate(It.Is<InventoryItemDetailsDto>
                    (m => m.Name == _itemName 
                          && m.Version == _version 
                          && m.Id == _itemId 
                          && m.CurrentCount == 0
                          && m.Timestamp == _timeStamp)))
                .Returns(Task.CompletedTask)
                .Verifiable();
            repositoryMock.Setup(x => x.GetById(_itemId))
                .ReturnsAsync(_searchResponseMock.Object);

            var target = GetTarget(repositoryMock, hubMock);

            await target.Handle(itemsRemovedFromInventoryEvent, new CancellationToken(false));
            repositoryMock.Verify();
            hubMock.Verify();
        }

        [Fact]
        public async Task HandleHandlesItemsCheckedInToInventory()
        {
            var repositoryMock = new Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>>();
            var hubMock = new Mock<InventoryHub>();

            var itemsCheckedInToInventoryEvent = new ItemsCheckedInToInventory(_itemId, 5)
            {
                Version = _version,
                TimeStamp = _timeStamp
            };

            hubMock.Setup(x => x.SendUpdateInventoryItemDetailMessage(
                    _itemId, itemsCheckedInToInventoryEvent))
                .Returns(Task.CompletedTask)
                .Verifiable();
            repositoryMock.Setup(x => x.AddOrUpdate(It.Is<InventoryItemDetailsDto>
                    (m => m.Name == _itemName && m.Version == 0 
                                              && m.Id == _itemId 
                                              && m.CurrentCount == 10
                                              && m.Timestamp == _timeStamp)))
                .Returns(Task.CompletedTask)
                .Verifiable();
            repositoryMock.Setup(x => x.GetById(_itemId))
                .ReturnsAsync(_searchResponseMock.Object);

            var target = GetTarget(repositoryMock, hubMock);

            await target.Handle(itemsCheckedInToInventoryEvent, new CancellationToken(false));
            repositoryMock.Verify();
            hubMock.Verify();
        }

        [Fact]
        public async Task HandleHandlesInventoryItemDeactivated()
        {
            var repositoryMock = new Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>>();
            var hubMock = new Mock<InventoryHub>();

            var inventoryItemDeactivated = new InventoryItemDeactivated(_itemId)
            {
                Version = _version,
                TimeStamp = _timeStamp
            };

            hubMock.Setup(x => x.SendUpdateInventoryItemDetailMessage(
                    _itemId, inventoryItemDeactivated))
                .Returns(Task.CompletedTask)
                .Verifiable();
            repositoryMock.Setup(x => x.DeleteById(_itemId))
                .Returns(Task.CompletedTask)
                .Verifiable();

            var target = GetTarget(repositoryMock, hubMock);

            await target.Handle(inventoryItemDeactivated, new CancellationToken(false));
            repositoryMock.Verify();
            hubMock.Verify();
        }

        private InventoryItemDetailView GetTarget(
            IMock<IReadModelRepository<InventoryItemDetailsDto, Guid>> repositoryMock,
            IMock<InventoryHub> hubMock)
        {
            return new InventoryItemDetailView(
                repositoryMock.Object,
                hubMock.Object);
        }
    }
}
