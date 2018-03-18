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
    /// The inventory list view handler.
    /// </summary>
    /// <seealso cref="CQRSlite.Events.ICancellableEventHandler{T}" />
    public class InventoryListView : ICancellableEventHandler<InventoryItemCreated>,
	    ICancellableEventHandler<InventoryItemRenamed>,
	    ICancellableEventHandler<InventoryItemDeactivated>,
        ICancellableEventHandler<ItemsRemovedFromInventory>,
        ICancellableEventHandler<ItemsCheckedInToInventory>
    {
        /// <summary>
        /// The database
        /// </summary>
        private readonly IReadModelRepository<InventoryItemListDto, Guid> _database;

        /// <summary>
        /// The inventory message hub
        /// </summary>
        private readonly InventoryHub _hub;

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryListView"/> class.
        /// </summary>
        /// <param name="database">The database.</param>
        /// <param name="hub">The hub.</param>
        public InventoryListView(IReadModelRepository<InventoryItemListDto, Guid> database, InventoryHub hub)
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
            await _database.AddOrUpdate(new InventoryItemListDto(message.Id, message.Name, message.Version)
            {
                Timestamp = message.TimeStamp.DateTime
            });

            // notify hub
            await _hub.SendUpdateInventoryListMessage();
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
                var item = itemQuery.Documents.Single();
                item.Name = message.NewName;
                item.Version = message.Version;
                item.Timestamp = message.TimeStamp.DateTime;
                await _database.AddOrUpdate(item);
            }

            // notify hub
            await _hub.SendUpdateInventoryListMessage();
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
                var item = itemQuery.Documents.Single();
                item.CurrentCount -= message.Count;
                item.Timestamp = message.TimeStamp.DateTime;
                item.Version = message.Version;
                await _database.AddOrUpdate(item);
            }

            // notify hub
            await _hub.SendUpdateInventoryListMessage();
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
                d.Timestamp = message.TimeStamp.DateTime;
                d.Version = message.Version;
                await _database.AddOrUpdate(d);

                // notify hub
                await _hub.SendUpdateInventoryListMessage();
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
            await _hub.SendUpdateInventoryListMessage();
        }
    }
}