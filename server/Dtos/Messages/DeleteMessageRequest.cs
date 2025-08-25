namespace server.Dtos.Messages
{
    public class DeleteMessageRequest
    {
        public int MessageId { get; set; }
        public bool DeleteAll { get; set; }
    }
}
