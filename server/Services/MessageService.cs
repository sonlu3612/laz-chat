using server.Domain;
using server.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using server.Dtos.Message;

namespace server.Services
{
    public class MessageService(ApplicationDbContext context, IMapper mapper) : IMessageService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        public async Task<Message> DeleteMessage(DeleteMessageRequest mess)
        {
            var message = await _context.Messages
                .Include(m => m.Channel)
                .FirstOrDefaultAsync(m => m.Id == mess.MessageId);
            _context.Messages.Remove(message ?? throw new InvalidOperationException("Message not found"));
            return message;
        }
        public async Task<Message> UpdateMessage(UpdateMessageRequest mess)
        {
            var message = await _context.Messages
                .Include(m => m.Channel)
                .FirstOrDefaultAsync(m => m.Id == mess.MessageId);
            if (message == null)
            {
                throw new InvalidOperationException("Message not found");
            }
            message.Content = mess.Content;
            message.EditedAt = DateTime.UtcNow;
            _context.Messages.Update(message);
            return message;
        }
        public async Task<IEnumerable<Message>> GetMessagesByChannelIdAsync(int channelId)
        {
            return await _context.Messages
                .Where(m => m.ChannelId == channelId)
                .ToListAsync();
        }
    }
}
