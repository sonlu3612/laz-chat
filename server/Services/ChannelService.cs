using server.Domain;
using server.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using server.Dtos.Channels;

namespace server.Services
{
    public class ChannelService(ApplicationDbContext context, IMapper mapper) : IChannelService
    {
        public readonly ApplicationDbContext _context = context;
        public readonly IMapper _mapper = mapper;

        public async Task<Channel> CreateChannelAsync(CreateChannel chann)
        {
            var channel = _mapper.Map<Channel>(chann);
            channel.CreatedAt = DateTime.UtcNow;
            channel.UpdatedAt = DateTime.UtcNow;

            _context.Channels.Add(channel);
            await _context.SaveChangesAsync();
            return channel;
        }
      
        public async Task<Channel> GetChannelByIdAsync(int id)
        {
            var channel = await _context.Channels.FindAsync(id);
            return channel ?? throw new InvalidOperationException($"Channel with ID {id} not found.");
        }

        public async Task<Channel> GetChannelByTitleAsync(string title)
        {
            var channel = await _context.Channels.FirstOrDefaultAsync(c => c.Title.ToLower() == title.ToLower());

            return channel ?? throw new InvalidOperationException($"Channel with title '{title}' not found.");
        }

        public async Task<IEnumerable<Channel>> GetAllChannelsAsync()
        {
            return await _context.Channels.ToListAsync();
        }
     
        public async Task<bool> UpdateChannelAsync(Channel channel)
        {
            _context.Channels.Update(channel);
            return await _context.SaveChangesAsync() > 0;
        }
       
        public async Task<bool> DeleteChannelAsync(int id)
        {
            var channel = await _context.Channels.FindAsync(id);
            if (channel == null)
                return false;
            _context.Channels.Remove(channel);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
