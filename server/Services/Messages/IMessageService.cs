using server.Domain;
using server.Dtos.Messages;

namespace server.Services.Messages
{
    public interface IMessageService
    {
        Task<Message> DeleteMessage(DeleteMessageRequest mess);
        Task<Message> UpdateMessage(UpdateMessageRequest mess);
        Task<IEnumerable<Message>> GetMessagesByChannelIdAsync(int channelId);
    }
}
