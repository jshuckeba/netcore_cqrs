namespace InventoryApi.WriteModel.EventStore
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    /// <summary>
    ///     Wraps events for storage in elastic search.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class ElasticWrappedEvent
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the aggregate identifier.
        /// </summary>
        /// <value>
        /// The aggregate identifier.
        /// </value>
        public Guid AggregateId { get; set; }

        /// <summary>
        /// Gets or sets the event.
        /// </summary>
        /// <value>
        /// The event.
        /// </value>
        public object Event { get; set; }

        /// <summary>
        /// Gets or sets the name of the event type.
        /// </summary>
        /// <value>
        /// The name of the event type.
        /// </value>
        public string EventTypeName { get; set; }

        /// <summary>
        /// Gets or sets the version.
        /// </summary>
        /// <value>
        /// The version.
        /// </value>
        public int Version { get; set; }
    }
}
