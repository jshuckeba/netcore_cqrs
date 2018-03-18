namespace InventoryApi.WriteModel.Commands
{
    using System;
    using CQRSlite.Commands;

    /// <summary>
    ///     Defines a new command.
    /// </summary>
    /// <seealso cref="ICommand" />
    public abstract class Command : ICommand
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the expected version.
        /// </summary>
        /// <value>
        /// The expected version.
        /// </value>
        public int ExpectedVersion { get; set; }
    }
}