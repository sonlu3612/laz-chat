using Xunit;
using Moq;
using Microsoft.AspNetCore.SignalR;
using server.Hubs;
using System.Threading.Tasks;

public class ChatHubTests
{
    [Fact]
    public async Task SendMessage_Should_Invoke_ClientSendAsync()
    {
        // Arrange
        var mockClients = new Mock<IHubCallerClients>();
        var mockClientProxy = new Mock<IClientProxy>();

        var channelId = "room1";
        var user = "Alice";
        var message = "Hello";

        // Khi gọi Clients.Group("room1") => trả về mockClientProxy
        mockClients.Setup(clients => clients.Group(channelId)).Returns(mockClientProxy.Object);

        var hub = new ChatHub
        {
            Clients = mockClients.Object
        };

        // Act
        await hub.SendMessage(channelId, user, message);

        // Assert
        mockClientProxy.Verify(
            client => client.SendCoreAsync(
                "ReceiveMessage",
                It.Is<object[]>(o => (string)o[0] == user && (string)o[1] == message),
                default
            ),
            Times.Once
        );
    }
}
