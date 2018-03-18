namespace InventoryApi.Hubs
{
    using System;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    using Models.ResponseModels;

    /// <summary>
    /// The inventory hub.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.SignalR.Hub" />
    [ExcludeFromCodeCoverage] // This cannot be easily tested due to use of built-in extension methods
    public class InventoryHub : Hub
    {
        /// <summary>
        /// Sends the update inventory list message.
        /// </summary>
        /// <returns>A <see cref="Task" />.</returns>
        public virtual async Task SendUpdateInventoryListMessage()
        {
            await Clients.Group("inventorylist").InvokeAsync("UpdateInventoryList", "Update");
            await Clients.Group("allinventory").InvokeAsync("UpdateInventoryList", "Update");
        }

        /// <summary>
        /// Sends the update inventory item detail message.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="event">The event.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public virtual async Task SendUpdateInventoryItemDetailMessage(Guid id, object @event)
        {
            var itemGroup = "inventoryitemdetail" + id.ToString().ToLowerInvariant();
            var response = new UpdateInventoryItemDetailMessageResponse(@event);

            await Clients.Group(itemGroup.ToLowerInvariant()).InvokeAsync("UpdateInventoryItemDetail", response);
            await Clients.Group("allinventory").InvokeAsync("UpdateInventoryItemDetail", response);
        }

        /// <summary>
        /// Called when a client requests a connection to the hub.
        /// </summary>
        /// <returns>A <see cref="Task" />.</returns>
        public override Task OnConnectedAsync()
        {
            var groupName = Context.Connection.GetHttpContext().Request.Query["group"].SingleOrDefault();

            Groups.AddAsync(Context.ConnectionId,
                !string.IsNullOrWhiteSpace(groupName) ? groupName.ToLowerInvariant() : "allinventory");

            return base.OnConnectedAsync();
        }
    }
}
