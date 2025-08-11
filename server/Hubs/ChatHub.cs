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
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChannelId.ToString());
        await Clients.Group(conn.ChannelId.ToString())
            .SendAsync("ReceiveMessage", "admin", $"{conn.User.FirstName + conn.User.LastName} has joined");
    }

    public async Task SendMessage(string channelId, string user, string message)
    {
        await Clients.Group(channelId).SendAsync("ReceiveMessage", user, message);
    }

    public async Task LeaveChatRoom(string channelId, string userName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelId);
        await Clients.Group(channelId).SendAsync("ReceiveMessage", "admin", $"{userName} has left the chat");
    }

    public async Task Typing(string channelId, string userName)
    {
        await Clients.Group(channelId).SendAsync("UserTyping", userName);
    }
}