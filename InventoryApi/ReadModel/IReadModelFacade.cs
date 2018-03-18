namespace InventoryApi.ReadModel
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Dtos;

    /// <summary>
    /// Defines the read model facade.
    /// </summary>
    public interface IReadModelFacade
    {
        /// <summary>
        /// Gets the inventory items.
        /// </summary>
        /// <param name="nameFilter">The name filter.</param>
        /// <param name="size">The size.</param>
        /// <returns>A <see cref="Task" /> of <see cref="IEnumerable{InventoryItemListDto}" />.</returns>
        Task<IEnumerable<InventoryItemListDto>> GetInventoryItems(string nameFilter, int? size);

        /// <summary>
        /// Gets the inventory item details.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>A <see cref="Task" /> of <see cref="InventoryItemDetailsDto" />.</returns>
        Task<InventoryItemDetailsDto> GetInventoryItemDetails(Guid id);
    }
}