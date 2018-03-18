namespace InventoryApi.Models.Settings
{
    /// <summary>
    ///     Defines settings for configuring ElasticSearch.
    /// </summary>
    public class ElasticSearchSettings
    {
        /// <summary>
        /// Gets or sets the elastic URL.
        /// </summary>
        /// <value>
        /// The elastic URL.
        /// </value>
        public string ElasticUrl { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="ElasticSearchSettings"/> class.
        /// </summary>
        public ElasticSearchSettings()
        {
            ElasticUrl = "http://localhost:9200";
        }
    }
}
