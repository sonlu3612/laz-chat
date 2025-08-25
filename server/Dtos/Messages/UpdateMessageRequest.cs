namespace server.Dtos.Messages
{
    public class UpdateMessageRequest
    {
        public int MessageId { get; set; }
        public required string Content { get; set; }
    }
}
