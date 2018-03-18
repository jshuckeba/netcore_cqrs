namespace InventoryApi.WriteModel.Commands
{
    using System;

    /// <summary>
    /// Checks in items to inventory.
    /// </summary>
    /// <seealso cref="InventoryApi.WriteModel.Commands.Command" />
    public class CheckInItemsToInventory : Command 
	{
        /// <summary>
        /// The count
        /// </summary>
        public readonly int Count;

        /// <summary>
        /// Initializes a new instance of the <see cref="CheckInItemsToInventory"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="count">The count.</param>
        /// <param name="originalVersion">The original version.</param>
        public CheckInItemsToInventory(Guid id, int count, int originalVersion) 
		{
            Id = id;
            Count = count;
            ExpectedVersion = originalVersion;
        }
	}
}