namespace InventoryApi.ReadModel.Handlers
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using CQRSlite.Events;
    using Dtos;
    using Hubs;
    using Infrastructure;
    using WriteModel.Events;

    /// <summary>
    /// The inventory item detail view handler.
    /// </summary>
    /// <seealso cref="ICancellableEventHandler{T}" />
    public class InventoryItemDetailView : ICancellableEventHandler<InventoryItemCreated>,
        ICancellableEventHandler<InventoryItemDeactivated>,
        ICancellableEventHandler<InventoryItemRenamed>,
        ICancellableEventHandler<ItemsRemovedFromInventory>,
        ICancellableEventHandler<ItemsCheckedInToInventory>
    {
        /// <summary>
        /// The database
        /// </summary>
        private readonly IReadModelRepository<InventoryItemDetailsDto, Guid> _database;

        /// <summary>
        /// The inventory message hub
        /// </summary>
        private readonly InventoryHub _hub;

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryItemDetailView"/> class.
        /// </summary>
        /// <param name="database">The database.</param>
        /// <param name="hub">The hub.</param>
        public InventoryItemDetailView(
            IReadModelRepository<InventoryItemDetailsDto, Guid> database, 
            InventoryHub hub)
        {
            _database = database;
            _hub = hub;
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(InventoryItemCreated message, CancellationToken token)
        {
            await _database.AddOrUpdate(new InventoryItemDetailsDto(message.Id, message.Name, 0, message.Version)
            {
                Timestamp = message.TimeStamp.DateTime
            });

            // notify hub
            await _hub.SendUpdateInventoryItemDetailMessage(message.Id, message);
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(InventoryItemRenamed message, CancellationToken token)
        {
            var itemQuery = await _database.GetById(message.Id);

            if (itemQuery.Documents.Any())
            {
                var d = itemQuery.Documents.Single();
                d.Name = message.NewName;
                d.Version = message.Version;
                d.Timestamp = message.TimeStamp.DateTime;
                await _database.AddOrUpdate(d);

                // notify hub
                await _hub.SendUpdateInventoryItemDetailMessage(message.Id, message);
            }
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(ItemsRemovedFromInventory message, CancellationToken token)
        {
            var itemQuery = await _database.GetById(message.Id);

            if (itemQuery.Documents.Any())
            {
                var d = itemQuery.Documents.Single();
                d.CurrentCount -= message.Count;
                d.Version = message.Version;
                d.Timestamp = message.TimeStamp.DateTime;
                await _database.AddOrUpdate(d);

                // notify hub
                await _hub.SendUpdateInventoryItemDetailMessage(message.Id, message);
            }
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(ItemsCheckedInToInventory message, CancellationToken token)
        {
            var itemQuery = await _database.GetById(message.Id);

            if (itemQuery.Documents.Any())
            {
                var d = itemQuery.Documents.Single();
                d.CurrentCount += message.Count;
                d.Version = message.Version;
                d.Timestamp = message.TimeStamp.DateTime;
                await _database.AddOrUpdate(d);

                // notify hub
                await _hub.SendUpdateInventoryItemDetailMessage(message.Id, message);
            }
        }

        /// <summary>
        /// Handles the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="token">The token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Handle(InventoryItemDeactivated message, CancellationToken token)
        {
            await _database.DeleteById(message.Id);

            // notify hub
            await _hub.SendUpdateInventoryItemDetailMessage(message.Id, message);
        }
    }
}
