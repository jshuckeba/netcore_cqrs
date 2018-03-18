using System.Linq;

namespace InventoryApi.ReadModel
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Dtos;
    using Infrastructure;

    /// <summary>
    /// The read model facade.
    /// </summary>
    /// <seealso cref="InventoryApi.ReadModel.IReadModelFacade" />
    public class ReadModelFacade : IReadModelFacade
    {
        /// <summary>
        /// The item list database
        /// </summary>
        private readonly IReadModelRepository<InventoryItemListDto, Guid> _itemListDatabase;

        /// <summary>
        /// The item details database
        /// </summary>
        private readonly IReadModelRepository<InventoryItemDetailsDto, Guid> _itemDetailsDatabase;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReadModelFacade"/> class.
        /// </summary>
        /// <param name="itemListDatabase">The item list database.</param>
        /// <param name="itemDetailsDatabase">The item details database.</param>
        public ReadModelFacade(IReadModelRepository<InventoryItemListDto, Guid> itemListDatabase,
            IReadModelRepository<InventoryItemDetailsDto, Guid> itemDetailsDatabase)
        {
            _itemListDatabase = itemListDatabase;
            _itemDetailsDatabase = itemDetailsDatabase;
        }
        
        /// <inheritdoc />
        public async Task<IEnumerable<InventoryItemListDto>> GetInventoryItems(string nameFilter, int? size)
        {
            if (!size.HasValue)
            {
                size = 5000;
            }

            try
            {
                var result = await _itemListDatabase.GetAll(s =>
                {
                    return !string.IsNullOrWhiteSpace(nameFilter)
                        ? s.Size(size).Query(q => q.Match(m => m.Field("name").Query(nameFilter)))
                        : s.Size(size);
                });

                return result.Documents;
            }
            catch
            {
                return new List<InventoryItemListDto>();
            }
        }

        /// <inheritdoc />
        public async Task<InventoryItemDetailsDto> GetInventoryItemDetails(Guid id)
        {
            var result = await _itemDetailsDatabase.GetById(id);
            return result.Documents.SingleOrDefault();
        }
    }
}