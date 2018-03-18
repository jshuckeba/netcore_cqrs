namespace InventoryApi.Test.Domain
{
    using System;
    using WriteModel.Domain;
    using Xunit;

    public class InventoryItemTests
    {
        private readonly Guid _id = Guid.NewGuid();

        private readonly string _initialName = "Item 1";

        [Fact]
        public void ChangeNameThrowsExceptionIfNameBlank()
        {
            var target = GetTarget();
            Assert.Throws<ArgumentException>(() => target.ChangeName(" "));
            Assert.Throws<ArgumentException>(() => target.ChangeName(null));
        }

        [Fact]
        public void RemoveThrowsExceptionIfCountNegative()
        {
            var target = GetTarget();
            Assert.Throws<InvalidOperationException>(() => target.Remove(-5));
        }

        [Fact]
        public void CheckInThrowsExceptionIfCountZeroOrLess()
        {
            var target = GetTarget();
            Assert.Throws<InvalidOperationException>(() => target.CheckIn(0));
            Assert.Throws<InvalidOperationException>(() => target.CheckIn(-1));
        }

        [Fact]
        public void DeactivateThrowsExceptionIfAlreadyDeactivated()
        {
            var target = GetTarget();
            target.Deactivate();
            Assert.Throws<InvalidOperationException>(() => target.Deactivate());
        }

        private InventoryItem GetTarget()
        {
            return new InventoryItem(_id, _initialName);
        }
    }
}
