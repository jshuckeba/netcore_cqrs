namespace InventoryApi.WriteModel.Commands
{
    using System;

    /// <summary>
    /// Removes items from inventory.
    /// </summary>
    /// <seealso cref="InventoryApi.WriteModel.Commands.Command" />
    public class RemoveItemsFromInventory : Command 
	{
        /// <summary>
        /// The count
        /// </summary>
        public readonly int Count;

        /// <summary>
        /// Initializes a new instance of the <see cref="RemoveItemsFromInventory"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="count">The count.</param>
        /// <param name="originalVersion">The original version.</param>
        public RemoveItemsFromInventory(Guid id, int count, int originalVersion)
	    {
	        Id = id;
			Count = count;
            ExpectedVersion = originalVersion;
        }
	}
}
