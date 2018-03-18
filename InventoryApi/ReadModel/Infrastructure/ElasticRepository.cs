using System.Linq;

namespace InventoryApi.ReadModel.Infrastructure
{
    using System;
    using System.Diagnostics.CodeAnalysis;
    using System.Threading.Tasks;
    using Elasticsearch.Net;
    using Nest;
    using Dtos;

    /// <summary>
    ///     Implements a read repository using ElasticSearch.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="TId">The type of the identifier.</typeparam>
    /// <seealso cref="IReadModelRepository{T, TId}" />
    /// <seealso cref="IReadModelRepository{T, TId}" />
    [ExcludeFromCodeCoverage]
    public class ElasticRepository<T, TId> : ElasticRepositoryBase, IReadModelRepository<T, TId>
        where T : class, IModel<TId>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ElasticRepository{T, TId}"/> class.
        /// </summary>
        /// <param name="client">The client.</param>
        public ElasticRepository(IElasticClient client) : base(client) { }

        /// <summary>
        /// Creates the fresh database.
        /// </summary>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task CreateFreshDb()
        {
            await Client.DeleteIndexAsync(IndexName);
        }

        /// <summary>
        /// Adds or update the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task AddOrUpdate(T item)
        {
            var indexName = IndexName + "-" + item.GetType().Name.ToLowerInvariant();

            var tryItem = await GetById(item.Id);

            if (tryItem != null && tryItem.Documents.Any())
            {
                await DeleteById(item.Id);
            }

            await Client.IndexAsync(item, i => i
                .Index(indexName)
                .Id(item.Id.ToString())
                .Refresh(Refresh.True)
                .Timeout(new Time(new TimeSpan(0, 0, 30))));
            await Client.RefreshAsync(indexName);
        }

        /// <summary>
        /// Deletes the item by the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task DeleteById(TId id)
        {
            var indexName = IndexName + "-" + typeof(T).Name.ToLowerInvariant();
            var deleteRequest = new DeleteRequest(indexName, typeof(T), id.ToString());
            await Client.DeleteAsync(deleteRequest);
            await Client.RefreshAsync(indexName);
        }

        /// <summary>
        /// Gets the search response by the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>A <see cref="Task" /> of <see cref="ISearchResponse{T}" />.</returns>
        public async Task<ISearchResponse<T>> GetById(TId id)
        {
            try
            {
                var indexName = IndexName + "-" + typeof(T).Name.ToLowerInvariant();
                return await Client.SearchAsync<T>(
                    s => s.Index(indexName).Query(q => q.Match(m => m.Field("_id").Query(id.ToString()))));
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Gets all items by the specified query.
        /// </summary>
        /// <param name="query">The query.</param>
        /// <returns>A <see cref="Task" /> of <see cref="ISearchResponse{T}" />.</returns>
        public async Task<ISearchResponse<T>> GetAll(Func<SearchDescriptor<T>, SearchDescriptor<T>> query)
        {
            var indexName = IndexName + "-" + typeof(T).Name.ToLowerInvariant();
            return await Client.SearchAsync<T>(
                s =>
                {
                    var searchDescriptor = s.Index(indexName);

                    if (query != null)
                    {
                        searchDescriptor = query.Invoke(searchDescriptor);
                    }

                    return searchDescriptor;
                });
        }
    }
}
