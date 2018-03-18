namespace InventoryApi.WriteModel.Commands
{
    using System;

    /// <summary>
    /// Renames the inventory item.
    /// </summary>
    /// <seealso cref="InventoryApi.WriteModel.Commands.Command" />
    public class RenameInventoryItem : Command 
	{
        /// <summary>
        /// The new name
        /// </summary>
        public readonly string NewName;

        /// <summary>
        /// Initializes a new instance of the <see cref="RenameInventoryItem"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="newName">The new name.</param>
        /// <param name="originalVersion">The original version.</param>
        public RenameInventoryItem(Guid id, string newName, int originalVersion)
        {
            Id = id;
            NewName = newName;
            ExpectedVersion = originalVersion;
        }
	}
}