namespace server.Dtos.Message
{
    public class UpdateMessageRequest
    {
        public int MessageId { get; set; }
        public required string Content { get; set; }
    }
}
