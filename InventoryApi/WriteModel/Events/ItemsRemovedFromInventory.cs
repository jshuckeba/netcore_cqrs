namespace InventoryApi.WriteModel.Events
{
    using System;
    using CQRSlite.Events;

    /// <summary>
    /// The items removed from inventory event.
    /// </summary>
    /// <seealso cref="CQRSlite.Events.IEvent" />
    public class ItemsRemovedFromInventory : IEvent
    {
        /// <summary>
        /// The count
        /// </summary>
        public readonly int Count;

        /// <summary>
        /// Initializes a new instance of the <see cref="ItemsRemovedFromInventory"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="count">The count.</param>
        public ItemsRemovedFromInventory(Guid id, int count) 
        {
            Id = id;
            Count = count;
        }

        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the version.
        /// </summary>
        /// <value>
        /// The version.
        /// </value>
        public int Version { get; set; }

        /// <summary>
        /// Gets or sets the time stamp.
        /// </summary>
        /// <value>
        /// The time stamp.
        /// </value>
        public DateTimeOffset TimeStamp { get; set; }
    }
}