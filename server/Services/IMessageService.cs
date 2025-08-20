using server.Domain;
using server.Dtos.Message;

namespace server.Services
{
    public interface IMessageService
    {
        Task<Message> DeleteMessage(DeleteMessageRequest mess);
        Task<Message> UpdateMessage(UpdateMessageRequest mess);
        Task<IEnumerable<Message>> GetMessagesByChannelIdAsync(int channelId);
    }
}
