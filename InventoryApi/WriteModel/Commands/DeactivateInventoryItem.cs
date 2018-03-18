namespace InventoryApi.WriteModel.Commands
{
    using System;

    /// <summary>
    /// Deactivates the inventory item.
    /// </summary>
    /// <seealso cref="InventoryApi.WriteModel.Commands.Command" />
    public class DeactivateInventoryItem : Command 
	{
        /// <summary>
        /// Initializes a new instance of the <see cref="DeactivateInventoryItem"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="originalVersion">The original version.</param>
        public DeactivateInventoryItem(Guid id, int originalVersion)
        {
            Id = id;
            ExpectedVersion = originalVersion;
        }
	}
}