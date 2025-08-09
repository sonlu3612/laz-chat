using server.Domain;
using server.Dtos;
using server.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace server.Services
{
    public class ChannelService : IChannelService
    {
        public readonly ApplicationDbContext _context;
        public readonly IMapper _mapper;

        public ChannelService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
     
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
            if (channel == null)
                throw new InvalidOperationException($"Channel with id {id} not found.");
            return channel;
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
        
        public async Task<IEnumerable<Message>> GetMessagesByChannelIdAsync(int channelId)
        {
            return await _context.Messages
                .Where(m => m.ChannelId == channelId)
                .ToListAsync();
        }
        public async Task<bool> DeleteMessageAsync(int messageId)
        {
            var message = await _context.Messages.FindAsync(messageId);
            if (message == null)
                return false;
            _context.Messages.Remove(message);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Message> SendMessageAsync(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}
