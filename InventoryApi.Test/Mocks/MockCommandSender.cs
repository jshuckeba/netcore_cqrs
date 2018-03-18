namespace InventoryApi.Test.Mocks
{
    using CQRSlite.Commands;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;

    public class MockCommandSender : ICommandSender
    {
        public List<ICommand> Commands { get; private set; }

        public MockCommandSender()
        {
            Commands = new List<ICommand>();
        }

        Task ICommandSender.Send<T>(T command, CancellationToken cancellationToken)
        {
            Commands.Add(command);
            return Task.CompletedTask;
        }
    }
}
