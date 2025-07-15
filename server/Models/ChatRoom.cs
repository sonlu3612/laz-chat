namespace server.Models;

public enum ChatRoomType
{
    Public,
    Private
}

public class ChatRoom
{
    public int Id { get; set; }
    public int CreatorId { get; set; }
    public string Title { get; set; } = string.Empty;
    public Boolean IsGroupChat { get; set; }
    public ChatRoomType Type { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; } 
    public DateTime DeletedAt { get; set; } 
}