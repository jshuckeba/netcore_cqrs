namespace InventoryApi.Test.ReadModel
{
    using InventoryApi.ReadModel.Dtos;
    using InventoryApi.ReadModel.Infrastructure;
    using Moq;
    using Nest;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InventoryApi.ReadModel;
    using Xunit;

    public class ReadModelFacadeTests
    {
        [Fact]
        public async Task GetInventoryItemsReturnsInventoryItems()
        {
            var items = new List<InventoryItemListDto>();
            for (var i = 0; i < 10; i++)
            {
                items.Add(new InventoryItemListDto(Guid.NewGuid(), "Item " + i, 1)
                {
                    CurrentCount = 5,
                    Timestamp = DateTime.Now
                });
            }

            var mockSearchResult = new Mock<ISearchResponse<InventoryItemListDto>>();
            mockSearchResult.Setup(x => x.Documents).Returns(items);

            var itemListDatabase = new Mock<IReadModelRepository<InventoryItemListDto, Guid>>();
            itemListDatabase.Setup(x =>
                    x.GetAll(It
                        .IsAny<Func<SearchDescriptor<InventoryItemListDto>, SearchDescriptor<InventoryItemListDto>>>()))
                .ReturnsAsync(mockSearchResult.Object)
                .Verifiable();

            var itemDetailDatabase = new Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>>();

            var target = GetTarget(itemListDatabase, itemDetailDatabase);
            var result = await target.GetInventoryItems(null, null);
            Assert.NotNull(result);
            var resultList = result.ToList();
            Assert.NotEmpty(resultList);
            Assert.Equal(10, resultList.Count());
            itemListDatabase.Verify();
        }

        [Fact]
        public async Task GetInventoryItemsReturnsEmptyListIfNoItemsFound()
        {
            var items = new List<InventoryItemListDto>();

            var mockSearchResult = new Mock<ISearchResponse<InventoryItemListDto>>();
            mockSearchResult.Setup(x => x.Documents).Returns(items);

            var itemListDatabase = new Mock<IReadModelRepository<InventoryItemListDto, Guid>>();
            itemListDatabase.Setup(x =>
                    x.GetAll(It
                        .IsAny<Func<SearchDescriptor<InventoryItemListDto>, SearchDescriptor<InventoryItemListDto>>>()))
                .ReturnsAsync(mockSearchResult.Object)
                .Verifiable();

            var itemDetailDatabase = new Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>>();

            var target = GetTarget(itemListDatabase, itemDetailDatabase);
            var result = await target.GetInventoryItems(null, 10);
            Assert.NotNull(result);
            var resultList = result.ToList();
            Assert.Empty(resultList);
            itemListDatabase.Verify();
        }

        [Fact]
        public async Task GetInventoryItemDetailsReturnsInventoryItemDetails()
        {
            var id = Guid.NewGuid();
            var items = new List<InventoryItemDetailsDto>()
            {
                new InventoryItemDetailsDto(id, "Item 1", 5, 1)
                {
                    CurrentCount = 5,
                    Timestamp = DateTime.Now
                }
            };

            var mockSearchResult = new Mock<ISearchResponse<InventoryItemDetailsDto>>();
            mockSearchResult.Setup(x => x.Documents).Returns(items);

            var itemListDatabase = new Mock<IReadModelRepository<InventoryItemListDto, Guid>>();

            var itemDetailDatabase = new Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>>();
            itemDetailDatabase.Setup(x =>
                    x.GetById(id))
                .ReturnsAsync(mockSearchResult.Object)
                .Verifiable();

            var target = GetTarget(itemListDatabase, itemDetailDatabase);
            var result = await target.GetInventoryItemDetails(id);
            Assert.NotNull(result);
            Assert.Equal(id, result.Id);
            Assert.Equal(items.Single().CurrentCount, result.CurrentCount);
            Assert.Equal(items.Single().Name, result.Name);
            itemDetailDatabase.Verify();
        }

        public IReadModelFacade GetTarget(
            Mock<IReadModelRepository<InventoryItemListDto, Guid>> itemListDatabase,
            Mock<IReadModelRepository<InventoryItemDetailsDto, Guid>> itemDetailsDatabase)
        {
            return new ReadModelFacade(itemListDatabase.Object, itemDetailsDatabase.Object);
        }
    }
}
