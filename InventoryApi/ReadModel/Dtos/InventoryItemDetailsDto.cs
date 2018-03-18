namespace InventoryApi.ReadModel.Dtos
{
    using System;

    /// <summary>
    /// The inventory item details data transfer object.
    /// </summary>
    /// <seealso cref="T:System.Guid" />
    public class InventoryItemDetailsDto : IModel<Guid>
    {
        /// <inheritdoc />
        public Guid Id { get; set; }

        /// <summary>
        /// The name
        /// </summary>
        public string Name;

        /// <summary>
        /// The current count
        /// </summary>
        public int CurrentCount;

        /// <summary>
        /// The timestamp
        /// </summary>
        public DateTime Timestamp;

        /// <summary>
        /// The version
        /// </summary>
        public int Version;

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryItemDetailsDto"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="name">The name.</param>
        /// <param name="currentCount">The current count.</param>
        /// <param name="version">The version.</param>
        public InventoryItemDetailsDto(Guid id, string name, int currentCount, int version)
        {
            Id = id;
            Name = name;
            CurrentCount = currentCount;
            Version = version;
            Timestamp = DateTime.UtcNow;
        }
    }
}