namespace InventoryApi.Middleware
{
    using System;
    using System.Net;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;

    /// <summary>
    ///     The error handling middleware.
    /// </summary>
    public class ErrorHandlingMiddleware
    {
        /// <summary>
        ///     The logger.
        /// </summary>
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        /// <summary>
        ///     The next <see cref="RequestDelegate" />.
        /// </summary>
        private readonly RequestDelegate _next;

        /// <summary>
        ///     Initializes a new instance of the <see cref="ErrorHandlingMiddleware" /> class.
        /// </summary>
        /// <param name="next">
        ///     The next <see cref="RequestDelegate" />.
        /// </param>
        /// <param name="logger">
        ///     The logger.
        /// </param>
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _next = next;
        }

        /// <summary>
        ///     Invokes the next <see cref="RequestDelegate" /> and catches any exception.
        /// </summary>
        /// <param name="context">
        ///     The context.
        /// </param>
        /// <returns>
        ///     The <see cref="Task" />.
        /// </returns>
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception e)
            {
                // See issue #367 for discussion on EventId usage https://github.com/aspnet/Logging/issues/367
                _logger.LogError(default(EventId), e, e.Message);

                if (context.Response.HasStarted)
                {
                    _logger.LogWarning("The response has already started.");
                    return;
                }

                try
                {
                    context.Response.Clear();
                }
                catch
                {
                    _logger.LogWarning("Failed to clear response.");
                }

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";
            }
        }
    }
}