namespace InventoryApi.Models.RequestModels
{
    /// <summary>
    /// Changes the item details
    /// </summary>
    /// <seealso cref="VersionedRequest" />
    public class ChangeItemDetailsRequest : VersionedRequest
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
