namespace InventoryApi.WriteModel.EventStore
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Reflection;
    using System.Threading;
    using System.Threading.Tasks;
    using CQRSlite.Events;
    using Elasticsearch.Net;
    using Nest;
    using Newtonsoft.Json;

    /// <summary>
    ///     Implements an event store using ElasticSearch.
    /// </summary>
    /// <seealso cref="CQRSlite.Events.IEventStore" />
    [ExcludeFromCodeCoverage]
    public class ElasticEventStore : IEventStore
    {
        /// <summary>
        /// The maximum event count
        /// </summary>
        public const int MaxEventCount = 9999;

        /// <summary>
        /// The warn event count
        /// </summary>
        public const int WarnEventCount = 8000;

        /// <summary>
        /// The warn event count message
        /// </summary>
        public const string WarnEventCountMessage =
            "You have one or more quotes with over {0} events. Quotes may eventually reach the maximum of {1} events. Consider implementing snapshots for quotes to alleviate this issue.";

        /// <summary>
        /// The index name
        /// </summary>
        public const string IndexName = "netcoreevents";

        /// <summary>
        /// The client
        /// </summary>
        private readonly IElasticClient _client;

        /// <summary>
        /// The publisher
        /// </summary>
        private readonly IEventPublisher _publisher;

        /// <summary>
        /// Gets or sets the locator assembly.
        /// </summary>
        /// <value>
        /// The locator assembly.
        /// </value>
        public Assembly LocatorAssembly { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="ElasticEventStore"/> class.
        /// </summary>
        /// <param name="client">The client.</param>
        /// <param name="publisher">The publisher.</param>
        public ElasticEventStore(IElasticClient client,
            IEventPublisher publisher)
        {
            _client = client;
            _publisher = publisher;
            LocatorAssembly = GetType().GetTypeInfo().Assembly;
        }

        /// <summary>
        /// Gets the specified aggregate identifier.
        /// </summary>
        /// <param name="aggregateId">The aggregate identifier.</param>
        /// <param name="fromVersion">From version.</param>
        /// <param name="ct">The cancellation token.</param>
        /// <returns>A <see cref="Task" /> of <see cref="IEnumerable{T}" />.</returns>
        public async Task<IEnumerable<IEvent>> Get(Guid aggregateId, int fromVersion, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            const string indexName = IndexName + "-*";
            var query =
                await _client.SearchAsync<ElasticWrappedEvent>(
                    s => s.Index(indexName)
                        .Query(q =>
                            q.Bool(b =>
                                b.Must(must =>
                                    must.MatchPhrase(m => m.Verbatim().Field("aggregateId").Query(aggregateId.ToString()))
                                    && must.Range(m => m.Field("version").GreaterThan(fromVersion)))))
                        .Size(MaxEventCount)
                        .Sort(ss => ss.Ascending(f => f.Version)));

            var result = query.Documents.Select(RecastEvent);

            return result;
        }

        /// <summary>
        /// Saves the specified events.
        /// </summary>
        /// <param name="events">The events.</param>
        /// <param name="ct">The cancellation token.</param>
        /// <returns>A <see cref="Task" />.</returns>
        public async Task Save(IEnumerable<IEvent> events, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            foreach (var @event in events)
            {
                var indexName = IndexName + "-" + @event.GetType().Name.ToLowerInvariant();
                // create the index if it doesn't exist
                if (!_client.IndexExists(indexName).Exists)
                {
                    _client.CreateIndex(indexName);
                }

                var wrappedEvent = new ElasticWrappedEvent
                {
                    Event = @event,
                    EventTypeName = @event.GetType().FullName,
                    Version = @event.Version,
                    AggregateId = @event.Id,
                    Id = Guid.NewGuid()
                };

                await _client.IndexAsync(wrappedEvent, i => i
                    .Index(indexName)
                    .Id(wrappedEvent.Id.ToString())
                    .Refresh(Refresh.True)
                    .Timeout(TimeSpan.FromSeconds(30)));

                await _publisher.Publish(@event);
            }
        }

        /// <summary>
        /// Recasts the event.
        /// </summary>
        /// <param name="event">The event.</param>
        /// <returns>An <see cref="IEvent" />.</returns>
        public IEvent RecastEvent(ElasticWrappedEvent @event)
        {
            var typedEvent =
                LocatorAssembly
                    .GetTypes()
                    .FirstOrDefault(t => t.GetInterfaces().Contains(typeof(IEvent))
                                            && t.FullName == @event.EventTypeName);

            return (IEvent)JsonConvert.DeserializeObject(@event.Event.ToString(), typedEvent);
        }
    }
}