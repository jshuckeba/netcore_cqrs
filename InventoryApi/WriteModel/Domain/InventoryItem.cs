namespace InventoryApi.WriteModel.Domain
{
    using System;
    using CQRSlite.Domain;
    using Events;
    using Services;

    /// <summary>
    /// The inventory item aggregate root.
    /// </summary>
    /// <seealso cref="CQRSlite.Domain.AggregateRoot" />
    public class InventoryItem : AggregateRoot
    {
        /// <summary>
        /// Determines whether the inventory item is activated.
        /// </summary>
        private bool _activated;

        /// <summary>
        /// Applies the specified event
        /// </summary>
        /// <param name="e">The event.</param>
        private void Apply(InventoryItemCreated e)
        {
            _activated = true;
        }

        /// <summary>
        /// Applies the specified event.
        /// </summary>
        /// <param name="e">The event.</param>
        private void Apply(InventoryItemDeactivated e)
        {
            _activated = false;
        }

        /// <summary>
        /// Changes the name.
        /// </summary>
        /// <param name="newName">The new name.</param>
        /// <exception cref="System.ArgumentException">newName</exception>
        public void ChangeName(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName)) throw new ArgumentException("newName");
            ApplyChange(new InventoryItemRenamed(Id, newName));
        }

        /// <summary>
        /// Removes the specified count.
        /// </summary>
        /// <param name="count">The count.</param>
        /// <exception cref="System.InvalidOperationException">cant remove negative count from inventory</exception>
        public void Remove(int count)
        {
            if (count <= 0) throw new InvalidOperationException("cant remove negative count from inventory");
            ApplyChange(new ItemsRemovedFromInventory(Id, count));
        }


        /// <summary>
        /// Checks in the specified count.
        /// </summary>
        /// <param name="count">The count.</param>
        /// <exception cref="System.InvalidOperationException">must have a count greater than 0 to add to inventory</exception>
        public void CheckIn(int count)
        {
            if (count <= 0) throw new InvalidOperationException("must have a count greater than 0 to add to inventory");
            ApplyChange(new ItemsCheckedInToInventory(Id, count));
        }

        /// <summary>
        /// Deactivates this instance.
        /// </summary>
        /// <exception cref="System.InvalidOperationException">already deactivated</exception>
        public void Deactivate()
        {
            if (!_activated) throw new InvalidOperationException("already deactivated");
            ApplyChange(new InventoryItemDeactivated(Id));
        }

        /// <summary>
        /// Prevents a default instance of the <see cref="InventoryItem"/> class from being created.
        /// </summary>
        private InventoryItem() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="InventoryItem"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="name">The name.</param>
        public InventoryItem(Guid id, string name)
        {
            Id = id;
            ApplyChange(new InventoryItemCreated(id, name));
        }
    }
}