namespace InventoryApi.Models.ResponseModels
{
    /// <summary>
    /// The update inventory item detail message response.
    /// </summary>
    public class UpdateInventoryItemDetailMessageResponse
    {
        /// <summary>
        /// Gets the type of the response.
        /// </summary>
        /// <value>
        /// The type of the response.
        /// </value>
        public string ResponseType { get; private set; }

        /// <summary>
        /// Gets the response.
        /// </summary>
        /// <value>
        /// The response.
        /// </value>
        public object Response { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="UpdateInventoryItemDetailMessageResponse"/> class.
        /// </summary>
        /// <param name="event">The event.</param>
        public UpdateInventoryItemDetailMessageResponse(object @event)
        {
            ResponseType = @event.GetType().Name;
            Response = @event;
        }
    }
}
