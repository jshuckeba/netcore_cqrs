namespace InventoryApi.Test.Middleware
{
    using InventoryApi.Middleware;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Logging.Internal;
    using Moq;
    using System;
    using System.IO;
    using System.Net;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http.Features;
    using Xunit;

    public class ErrorHandlingMiddlewareTests
    {
        [Fact]
        public async Task MiddlewareContinuesIfNoException()
        {
            var targets = GetTarget();
            var target = targets.Item1;
            var httpContextMock = targets.Item2;
            var httpResponseMock = targets.Item3;
            var loggerMock = targets.Item4;
            await target.Invoke(httpContextMock.Object);
            httpResponseMock.Verify();
            loggerMock.Verify();
        }

        [Fact]
        public async Task MiddlewareHandlesException()
        {
            var targets = GetTarget(true);
            var target = targets.Item1;
            var httpContextMock = targets.Item2;
            var httpResponseMock = targets.Item3;
            var loggerMock = targets.Item4;
            await target.Invoke(httpContextMock.Object);
            httpResponseMock.Verify();
            loggerMock.Verify();
        }

        private Tuple<ErrorHandlingMiddleware, Mock<HttpContext>, Mock<HttpResponse>, Mock<ILogger<ErrorHandlingMiddleware>>> GetTarget(bool shouldExcept = false, bool hasStarted = false)
        {
            const string ErrorMessage = "Something went sideways!";

            var httpResponseMock = new Mock<HttpResponse>();
            httpResponseMock.Setup(x => x.HasStarted)
                .Returns(hasStarted);
            httpResponseMock.Setup(x => x.Headers)
                .Returns(new HeaderDictionary());
            httpResponseMock.Setup(x => x.Body)
                .Returns(new MemoryStream());

            var httpContextMock = new Mock<HttpContext>();
            httpContextMock.Setup(x => x.Response)
                .Returns(httpResponseMock.Object);

            var loggerMock = new Mock<ILogger<ErrorHandlingMiddleware>>();
            var requestDelegateMock = new Mock<RequestDelegate>();

            if (shouldExcept)
            {
                var error = new InvalidOperationException(ErrorMessage);
                requestDelegateMock.Setup(x => x(httpContextMock.Object))
                    .Throws(error);
                loggerMock.Setup(x => x.Log(LogLevel.Error, default(EventId), new FormattedLogValues(ErrorMessage, null), error, It.IsAny<Func<object, Exception, string>>()))
                    .Verifiable();
            }

            return new Tuple<ErrorHandlingMiddleware, Mock<HttpContext>, Mock<HttpResponse>, Mock<ILogger<ErrorHandlingMiddleware>>>(
                new ErrorHandlingMiddleware(requestDelegateMock.Object, loggerMock.Object),
                httpContextMock,
                httpResponseMock,
                loggerMock);
        }
    }
}
