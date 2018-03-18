namespace InventoryApi.Models.RequestModels
{
    /// <summary>
    /// Requests the creation of a new inventory item.
    /// </summary>
    public class CreateInventoryItemRequest
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; set; }
    }
}
