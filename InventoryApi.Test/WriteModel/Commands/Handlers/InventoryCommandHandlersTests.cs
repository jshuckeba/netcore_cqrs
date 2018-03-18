namespace InventoryApi.Test.Domain
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using CQRSlite.Commands;
    using CQRSlite.Domain;
    using Moq;
    using WriteModel.Commands;
    using WriteModel.Commands.Handlers;
    using WriteModel.Domain;
    using Xunit;

    public class InventoryCommandHandlerTests
    {
        private readonly Guid _id = Guid.NewGuid();

        private readonly int _expectedVersion = 1;

        private readonly string _initialName = "Item 1";


        private readonly CancellationToken _token = new CancellationToken(false);

        [Fact]
        public async Task HandleHandlesCreateInventoryItemCommand()
        {
            var mockSession = new Mock<ISession>();
            mockSession.Setup(x => x.Add(It.IsAny<InventoryItem>(), default(CancellationToken)))
                .Returns(Task.CompletedTask)
                .Verifiable();
            var target = GetTarget(mockSession);
            await target.Handle(new CreateInventoryItem(_id, _initialName));
            mockSession.Verify();
        }

        [Fact]
        public async Task HandleHandlesDeactivateInventoryItemCommand()
        {
            var item = new InventoryItem(_id, _initialName);
            var mockSession = new Mock<ISession>();
            mockSession.Setup(x => x.Get<InventoryItem>(_id, _expectedVersion, _token))
                .ReturnsAsync(item)
                .Verifiable();
            var target = GetTarget(mockSession);
            await target.Handle(new DeactivateInventoryItem(_id, _expectedVersion), _token);
            mockSession.Verify();
        }

        [Fact]
        public async Task HandleHandlesRemoveItemsFromInventoryCommand()
        {
            var item = new InventoryItem(_id, _initialName);
            var mockSession = new Mock<ISession>();
            mockSession.Setup(x => x.Get<InventoryItem>(_id, _expectedVersion, _token))
                .ReturnsAsync(item)
                .Verifiable();
            var target = GetTarget(mockSession);
            await target.Handle(new RemoveItemsFromInventory(_id, 5, _expectedVersion), _token);
            mockSession.Verify();
        }

        [Fact]
        public async Task HandleHandlesCheckInItemsToInventoryCommand()
        {
            var item = new InventoryItem(_id, _initialName);
            var mockSession = new Mock<ISession>();
            mockSession.Setup(x => x.Get<InventoryItem>(_id, _expectedVersion, _token))
                .ReturnsAsync(item)
                .Verifiable();
            var target = GetTarget(mockSession);
            await target.Handle(new CheckInItemsToInventory(_id, 5, _expectedVersion), _token);
            mockSession.Verify();
        }

        [Fact]
        public async Task HandleHandlesRenameInventoryItemCommand()
        {
            var item = new InventoryItem(_id, _initialName);
            var mockSession = new Mock<ISession>();
            mockSession.Setup(x => x.Get<InventoryItem>(_id, _expectedVersion, _token))
                .ReturnsAsync(item)
                .Verifiable();
            var target = GetTarget(mockSession);
            await target.Handle(new RenameInventoryItem(_id, "New Name", _expectedVersion), _token);
            mockSession.Verify();
        }

        private InventoryCommandHandlers GetTarget(Mock<ISession> mockSession)
        {
            return new InventoryCommandHandlers(mockSession.Object);
        }
    }
}
