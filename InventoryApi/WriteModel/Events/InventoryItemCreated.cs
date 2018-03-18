namespace InventoryApi.WriteModel.Events
{
    using System;
    using CQRSlite.Events;

    /// <summary>
    /// The inventory item created event.
    /// </summary>
    /// <seealso cref="CQRSlite.Events.IEvent" />
    public class InventoryItemCreated : IEvent 
	{
        /// <summary>
        /// The name
        /// </summary>
        public readonly string Name;

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryItemCreated"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="name">The name.</param>
        public InventoryItemCreated(Guid id, string name) 
        {
            Id = id;
            Name = name;
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