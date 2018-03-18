namespace InventoryApi.ReadModel.Infrastructure
{
    using System.Diagnostics.CodeAnalysis;
    using Nest;

    /// <summary>
    /// The ElasticSearch repository base.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public abstract class ElasticRepositoryBase
    {
        /// <summary>
        /// The index name
        /// </summary>
        public const string IndexName = "netcoreapi";

        /// <summary>
        /// The client
        /// </summary>
        protected readonly IElasticClient Client;

        /// <summary>
        /// Initializes a new instance of the <see cref="ElasticRepositoryBase"/> class.
        /// </summary>
        /// <param name="client">The client.</param>
        protected ElasticRepositoryBase(IElasticClient client)
        {
            Client = client;
        }
    }
}
