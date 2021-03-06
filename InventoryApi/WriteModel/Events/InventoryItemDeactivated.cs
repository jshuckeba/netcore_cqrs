﻿namespace InventoryApi.WriteModel.Events
{
    using System;
    using CQRSlite.Events;

    /// <summary>
    /// The inventory item deactivated event.
    /// </summary>
    /// <seealso cref="CQRSlite.Events.IEvent" />
    public class InventoryItemDeactivated : IEvent 
	{
        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryItemDeactivated"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        public InventoryItemDeactivated(Guid id)
        {
            Id = id;
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