namespace InventoryApi.ReadModel.Dtos
{
    /// <summary>
    /// Defines a model with the specified type of identifier.
    /// </summary>
    /// <typeparam name="T">The type of the model identifier.</typeparam>
    public interface IModel<T>
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        T Id { get; set; }
    }
}
