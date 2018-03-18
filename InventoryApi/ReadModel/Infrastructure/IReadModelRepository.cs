using System;

namespace InventoryApi.ReadModel.Infrastructure
{
    using System.Threading.Tasks;
    using Nest;

    /// <summary>
    /// Defines the read model repository.
    /// </summary>
    /// <typeparam name="T">The type of the item.</typeparam>
    /// <typeparam name="TId">The type of the identifier.</typeparam>
    public interface IReadModelRepository<T, in TId> where T : class
    {
        /// <summary>
        /// Creates the fresh database.
        /// </summary>
        /// <returns>A <see cref="Task" />.</returns>
        Task CreateFreshDb();

        /// <summary>
        /// Adds or updates the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>A <see cref="Task" />.</returns>
        Task AddOrUpdate(T item);

        /// <summary>
        /// Deletes the item with the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>A <see cref="Task" />.</returns>
        Task DeleteById(TId id);

        /// <summary>
        /// Gets the item by the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>A <see cref="Task" /> of <see cref="ISearchResponse{T}" />.</returns>
        Task<ISearchResponse<T>> GetById(TId id);

        /// <summary>
        /// Gets all items by the specified query.
        /// </summary>
        /// <param name="query">The query.</param>
        /// <returns>A <see cref="Task" /> of <see cref="ISearchResponse{T}" />.</returns>
        Task<ISearchResponse<T>> GetAll(Func<SearchDescriptor<T>, SearchDescriptor<T>> query);
    }
}
