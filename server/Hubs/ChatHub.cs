using Microsoft.AspNetCore.SignalR;
using server.Domain;

namespace server.Hubs;

public class ChatHub : Hub
{
    public async Task JoinChat(UserConnection conn)
    {
        await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.UserId} has joined");
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.User.FirstName + conn.User.LastName);
        await Clients.Group(conn.Channel.Title).SendAsync("ReceiveMessage", "admin", $"{conn.User.FirstName + conn.User.LastName} has joined {conn.ChannelId}");
    }

    public async Task SendMessage(string channelId, string user, string message)
    {
        await Clients.Group(channelId).SendAsync("ReceiveMessage", user, message);
    }
}