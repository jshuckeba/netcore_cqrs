namespace InventoryApi
{
    using System;
    using System.Diagnostics.CodeAnalysis;
    using System.IO;
    using System.IO.Compression;
    using System.Linq;
    using System.Reflection;
    using CQRSlite.Caching;
    using CQRSlite.Commands;
    using CQRSlite.Domain;
    using CQRSlite.Events;
    using CQRSlite.Messages;
    using CQRSlite.Routing;
    using Elasticsearch.Net;
    using Hubs;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Cors.Internal;
    using Microsoft.AspNetCore.ResponseCompression;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;
    using Microsoft.Extensions.PlatformAbstractions;
    using Middleware;
    using Models.Settings;
    using Nest;
    using ReadModel;
    using ReadModel.Dtos;
    using ReadModel.Infrastructure;
    using Services;
    using Swashbuckle.AspNetCore.Swagger;
    using WriteModel.Commands.Handlers;
    using WriteModel.EventStore;
    using ISession = CQRSlite.Domain.ISession;

    /// <summary>
    /// Configures and starts the application.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class Startup
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// </summary>
        /// <param name="env">The env.</param>
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder().SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        /// <value>
        /// The configuration.
        /// </value>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Configures the services. This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services">The services.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            // Elasticsearch
            services.AddSingleton<IConnectionPool, SingleNodeConnectionPool>(s =>
            {
                var elasticSearchSettings = s.GetService<IOptions<ElasticSearchSettings>>();
                return new SingleNodeConnectionPool(new Uri(elasticSearchSettings.Value.ElasticUrl));
            });

            services.AddSingleton<IConnectionSettingsValues, ConnectionSettings>(
                s => new ConnectionSettings(s.GetService<IConnectionPool>())
                    .ThrowExceptions());

            services.AddTransient<IElasticClient, ElasticClient>(s =>
            {
                var settings = (IConnectionSettingsValues)s.GetService(typeof(IConnectionSettingsValues));
                return new ElasticClient(settings);
            });

            // CQRS
            services.AddSingleton(new Router());
            services.AddSingleton<ICommandSender>(y => y.GetService<Router>());
            services.AddSingleton<IEventPublisher>(y => y.GetService<Router>());
            services.AddSingleton<IHandlerRegistrar>(y => y.GetService<Router>());
            services.AddTransient<IEventStore, ElasticEventStore>();
            services.AddSingleton<ICache, MemoryCache>();
            services.AddScoped<IRepository>(y => new CacheRepository(new Repository(y.GetService<IEventStore>()), y.GetService<IEventStore>(), y.GetService<ICache>()));
            services.AddScoped<ISession, Session>();
            services
                .AddTransient<IReadModelRepository<InventoryItemDetailsDto, Guid>,
                    ElasticRepository<InventoryItemDetailsDto, Guid>>();
            services
                .AddTransient<IReadModelRepository<InventoryItemListDto, Guid>,
                    ElasticRepository<InventoryItemListDto, Guid>>();
            services.AddTransient<IReadModelFacade, ReadModelFacade>();

            //Scan for commandhandlers
            services.Scan(scan => scan
                .FromAssemblies(typeof(InventoryCommandHandlers).GetTypeInfo().Assembly)
                .AddClasses(classes => classes.Where(x => {
                    var allInterfaces = x.GetInterfaces();
                    return
                        allInterfaces.Any(y => y.GetTypeInfo().IsGenericType && y.GetTypeInfo().GetGenericTypeDefinition() == typeof(IHandler<>)) ||
                        allInterfaces.Any(y => y.GetTypeInfo().IsGenericType && y.GetTypeInfo().GetGenericTypeDefinition() == typeof(ICancellableHandler<>));
                }))
                .AsSelf()
                .WithTransientLifetime()
            );

            // Register routes
            var serviceProvider = services.BuildServiceProvider();
            var registrar = new RouteRegistrar(new ScopedServiceProvider(serviceProvider));
            registrar.RegisterInAssemblyOf(typeof(InventoryCommandHandlers));

            // Configure CORS
            services.AddCors(
                options =>
                {
                    options.AddPolicy(
                        "ConfiguredCorsPolicy",
                        builder =>
                        {
                            var allowedOrigins = (Configuration["Cors:Origins"] ?? string.Empty).Split(',')
                                .Select(x => x.Trim())
                                .Where(x => !string.IsNullOrWhiteSpace(x))
                                .ToArray();
                            var allowedMethods = (Configuration["Cors:Methods"] ?? string.Empty).Split(',')
                                .Select(x => x.Trim())
                                .Where(x => !string.IsNullOrWhiteSpace(x))
                                .ToArray();
                            var allowedHeaders = (Configuration["Cors:Headers"] ?? string.Empty).Split(',')
                                .Select(x => x.Trim())
                                .Where(x => !string.IsNullOrWhiteSpace(x))
                                .ToArray();

                            var b = allowedOrigins.Length == 0 ? builder.AllowAnyOrigin() : builder.WithOrigins(allowedOrigins);

                            b = allowedMethods.Length == 0 ? b.AllowAnyMethod() : b.WithMethods(allowedMethods);

                            if (allowedHeaders.Length == 0)
                            {
                                b.AllowAnyHeader();
                            }
                            else
                            {
                                b.WithHeaders(allowedHeaders);
                            }
                        });
                });

            services.Configure<MvcOptions>(options => { options.Filters.Add(new CorsAuthorizationFilterFactory("ConfiguredCorsPolicy")); });

            // Compression
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Optimal);
            services.AddResponseCompression();

            // SignalR
            services.AddSignalR();
            services.AddSingleton<InventoryHub, InventoryHub>();

            // Services
            services.AddSingleton<IOrderService, PretendOrderService>();

            // Swagger
            services.AddSwaggerGen(
                options =>
                {
                    options.SwaggerDoc("v1", new Info { Title = "netcore_CQRS", Version = "v1" });

                    var xmlPath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "InventoryApi.xml");
                    options.IncludeXmlComments(xmlPath);
                });
        }

        /// <summary>
        /// Configures the specified application. This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="env">The env.</param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();

            app.UseCors("ConfiguredCorsPolicy");

            app.UseStaticFiles();

            app.UseSignalR(routes => { routes.MapHub<InventoryHub>("api/broadcastInventory"); });

            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseSwagger();

            app.UseSwaggerUI(
                options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "netcore_CQRS v1");
                });
        }
    }
}
