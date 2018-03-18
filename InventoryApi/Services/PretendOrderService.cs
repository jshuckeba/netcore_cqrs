namespace InventoryApi.Services
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Logging;

    /// <summary>
    /// Implements a service which simulates placing orders for an item.
    /// </summary>
    /// <seealso cref="InventoryApi.Services.IOrderService" />
    public class PretendOrderService : IOrderService
    {
        private readonly ILogger<PretendOrderService> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="PretendOrderService"/> class.
        /// </summary>
        /// <param name="logger">The logger.</param>
        public PretendOrderService(ILogger<PretendOrderService> logger)
        {
            _logger = logger;
        }

        /// <inheritdoc />
        public Task PlaceOrder(Guid itemId, int count)
        {
            _logger.LogInformation($"{count} items have been ordered for {itemId}.");
            return Task.CompletedTask;
        }
    }
}
