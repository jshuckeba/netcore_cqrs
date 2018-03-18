namespace InventoryApi.WriteModel.Commands.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using CQRSlite.Commands;
    using CQRSlite.Domain;
    using Domain;

    /// <summary>
    /// Handles the inventory commands
    /// </summary>
    /// <seealso cref="CQRSlite.Commands.ICommandHandler{T}" />
    public class InventoryCommandHandlers : ICommandHandler<CreateInventoryItem>,
        ICancellableCommandHandler<DeactivateInventoryItem>,
        ICancellableCommandHandler<RemoveItemsFromInventory>,
        ICancellableCommandHandler<CheckInItemsToInventory>,
        ICancellableCommandHandler<RenameInventoryItem>
    {
        /// <summary>
        /// The session
        /// </summary>
        private readonly ISession _session;

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryCommandHandlers"/> class.
        /// </summary>
        /// <param name="session">The session.</param>
        public InventoryCommandHandlers(ISession session)
        {
            _session = session;
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(CreateInventoryItem message)
        {
            var item = new InventoryItem(message.Id, message.Name);
            await _session.Add(item);
            await _session.Commit();
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(DeactivateInventoryItem message, CancellationToken token)
        {
            var item = await _session.Get<InventoryItem>(message.Id, message.ExpectedVersion, token);
            item.Deactivate();
            await _session.Commit(token);
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(RemoveItemsFromInventory message, CancellationToken token)
        {
            var item = await _session.Get<InventoryItem>(message.Id, message.ExpectedVersion, token);
            item.Remove(message.Count);
            await _session.Commit(token);
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(CheckInItemsToInventory message, CancellationToken token)
        {
            var item = await _session.Get<InventoryItem>(message.Id, message.ExpectedVersion, token);
            item.CheckIn(message.Count);
            await _session.Commit(token);
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(RenameInventoryItem message, CancellationToken token)
        {
            var item = await _session.Get<InventoryItem>(message.Id, message.ExpectedVersion, token);
            item.ChangeName(message.NewName);
            await _session.Commit(token);
        }
    }
}
