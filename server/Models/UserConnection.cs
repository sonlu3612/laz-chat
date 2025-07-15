using server.Models; // or replace with the actual namespace where ApplicationUser is defined
using Microsoft.AspNetCore.Identity; 

namespace server.Models;

public class UserConnection
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string ChatRoomId { get; set; } = string.Empty;
    public DateTime JoinedAt { get; set; }
}