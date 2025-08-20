using server.Domain;
using server.Dtos.Channels;

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
    }
}
