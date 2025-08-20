using server.Domain;

namespace server.Dtos.Channels
{
    public class CreateChannel
    {
        public string Title { get; set; } = string.Empty;
        public int CreatorId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsGroupChat { get; set; }
        public ChannelType Type { get; set; }
    }
}
