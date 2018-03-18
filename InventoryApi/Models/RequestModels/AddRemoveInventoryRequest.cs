namespace InventoryApi.Models.RequestModels
{
    /// <summary>
    /// Adds or removes inventory items.
    /// </summary>
    /// <seealso cref="VersionedRequest" />
    public class AddRemoveInventoryRequest : VersionedRequest
    {
        /// <summary>
        /// Gets or sets the number of inventory.
        /// </summary>
        /// <value>
        /// The number.
        /// </value>
        public int Number { get; set; }
    }
}
