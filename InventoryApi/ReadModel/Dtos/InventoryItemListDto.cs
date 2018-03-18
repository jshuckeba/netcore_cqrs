namespace InventoryApi.ReadModel.Dtos
{
    using System;

    /// <inheritdoc />
    public class InventoryItemListDto : IModel<Guid>
    {
        /// <inheritdoc />
        public Guid Id { get; set; }

        /// <summary>
        /// The name
        /// </summary>
        public string Name;

        /// <summary>
        /// The timestamp
        /// </summary>
        public DateTime Timestamp;

        /// <summary>
        /// The current count
        /// </summary>
        public int CurrentCount;

        /// <summary>
        /// The version
        /// </summary>
        public int Version;

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryItemListDto"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="name">The name.</param>
        /// <param name="version">The version.</param>
        public InventoryItemListDto(Guid id, string name, int version)
        {
            Id = id;
            Name = name;
            Timestamp = DateTime.UtcNow;
            Version = version;
        }
    }
}