namespace InventoryApi.Services
{
    using System;
    using System.Threading.Tasks;

    /// <summary>
    /// Defines a service that orders inventory items
    /// </summary>
    public interface IOrderService
    {
        /// <summary>
        /// Places an order using an external order service.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="count">The count to order.</param>
        /// <returns>A <see cref="Task" /></returns>
        Task PlaceOrder(Guid itemId, int count);
    }
}
