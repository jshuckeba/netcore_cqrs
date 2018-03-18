namespace InventoryApi.WriteModel.Commands
{
    using System;

    /// <summary>
    /// Creates an inventory item.
    /// </summary>
    /// <seealso cref="InventoryApi.WriteModel.Commands.Command" />
    public class CreateInventoryItem : Command 
	{
        /// <summary>
        /// The name
        /// </summary>
        public readonly string Name;

        /// <summary>
        /// Initializes a new instance of the <see cref="CreateInventoryItem"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="name">The name.</param>
        public CreateInventoryItem(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
	}
}