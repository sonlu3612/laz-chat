using server.Domain;
using server.Dtos;

namespace server.Services
{
    public interface IChannelService
    {
        Task<Channel> CreateChannelAsync(CreateChannel channel);
        Task<Channel> GetChannelByIdAsync(int id);
        Task<Channel> GetChannelByTitleAsync(string title);
        Task<IEnumerable<Channel>> GetAllChannelsAsync();
        Task<bool> UpdateChannelAsync(Channel channel);
        Task<bool> DeleteChannelAsync(int id);
        Task<IEnumerable<Message>> GetMessagesByChannelIdAsync(int channelId);
        Task<Message> SendMessageAsync(Message message);
        Task<bool> DeleteMessageAsync(int messageId);
    }
}
