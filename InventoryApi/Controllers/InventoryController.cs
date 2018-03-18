using System.Linq;

namespace InventoryApi.Controllers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using CQRSlite.Commands;
    using Microsoft.AspNetCore.Mvc;
    using Models.RequestModels;
    using ReadModel;
    using WriteModel.Commands;

    /// <summary>
    /// The inventory controller.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Produces("application/json")]
    [Route("api/inventory")]
    public class InventoryController : Controller
    {
        /// <summary>
        /// The command sender
        /// </summary>
        private readonly ICommandSender _commandSender;

        /// <summary>
        /// The read model facade
        /// </summary>
        private readonly IReadModelFacade _readModelFacade;

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryController" /> class.
        /// </summary>
        /// <param name="commandSender">The command sender.</param>
        /// <param name="readModelFacade">The read model facade.</param>
        public InventoryController(ICommandSender commandSender, IReadModelFacade readModelFacade)
        {
            _commandSender = commandSender;
            _readModelFacade = readModelFacade;
        }

        // GET: api/inventory
        /// <summary>
        /// Gets the inventory list.
        /// </summary>
        /// <param name="nameFilter">The name filter.</param>
        /// <param name="size">The size.</param>
        /// <returns>
        /// The inventory list.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string nameFilter, [FromQuery] int? size)
        {
            var result = await _readModelFacade.GetInventoryItems(nameFilter, size);
            if (!string.IsNullOrWhiteSpace(nameFilter))
            {
                return Ok(result);
            }

            return Ok(result.OrderBy(o => o.Name));
        }

        // GET: api/Inventory/5
        /// <summary>
        /// Gets the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The inventory item.</returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            return Ok(await _readModelFacade.GetInventoryItemDetails(id));
        }

        // POST: api/Inventory
        /// <summary>
        /// Creates an inventory item.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>An HTTP response.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateInventoryItem([FromBody]CreateInventoryItemRequest request, CancellationToken cancellationToken)
        {
            var id = Guid.NewGuid();
            await _commandSender.Send(new CreateInventoryItem(id, request.Name), cancellationToken);
            return Ok(id);
        }

        // PUT: api/Inventory/5
        /// <summary>
        /// Changes the item details.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="request">The request.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>An HTTP response.</returns>
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> ChangeItemDetails([FromRoute]Guid id, [FromBody] ChangeItemDetailsRequest request, CancellationToken cancellationToken)
        {
            await _commandSender.Send(new RenameInventoryItem(id, request.Name, request.Version), cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Deactivates the specified inventory item.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="request">The request.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>An HTTP response.</returns>
        [HttpDelete]
        [Route("deactivate/{id}")]
        public async Task<IActionResult> Deactivate([FromRoute] Guid id, [FromBody]VersionedRequest request, CancellationToken cancellationToken)
        {
            await _commandSender.Send(new DeactivateInventoryItem(id, request.Version), cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Checks in new inventory for the specified item.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="request">The request.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>An HTTP response.</returns>
        [HttpPut]
        [Route("checkin/{id}")]
        public async Task<IActionResult> CheckIn([FromRoute] Guid id, [FromBody] AddRemoveInventoryRequest request, CancellationToken cancellationToken)
        {
            await _commandSender.Send(new CheckInItemsToInventory(id, request.Number, request.Version), cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Removes inventory for the specified item.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="request">The request.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>An HTTP response.</returns>
        [HttpPut]
        [Route("remove/{id}")]
        public async Task<IActionResult> Remove(Guid id, [FromBody] AddRemoveInventoryRequest request, CancellationToken cancellationToken)
        {
            await _commandSender.Send(new RemoveItemsFromInventory(id, request.Number, request.Version), cancellationToken);
            return Ok();
        }
    }
}
