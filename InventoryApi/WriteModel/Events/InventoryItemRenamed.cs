namespace InventoryApi.WriteModel.Events
{
    using System;
    using CQRSlite.Events;

    /// <summary>
    /// The inventory item renamed event.
    /// </summary>
    /// <seealso cref="CQRSlite.Events.IEvent" />
    public class InventoryItemRenamed : IEvent
    {
        /// <summary>
        /// The new name
        /// </summary>
        public readonly string NewName;

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryItemRenamed"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="newName">The new name.</param>
        public InventoryItemRenamed(Guid id, string newName)
        {
            Id = id;
            NewName = newName;
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