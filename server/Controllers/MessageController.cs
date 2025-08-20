using Microsoft.AspNetCore.Mvc;
using server.Dtos.Message;
using server.Services;

namespace server.Controllers
{
    public class MessageController(IMessageService MessageService) : ControllerBase
    {
        public readonly IMessageService _messageService = MessageService;


        [HttpGet("{channelId}/messages")]
        public async Task<IActionResult> GetMessagesByChannelId(int channelId)
        {
            var messages = await _messageService.GetMessagesByChannelIdAsync(channelId);
            if (messages == null || !messages.Any())
            {
                return NotFound("No messages found for this channel.");
            }
            return Ok(messages);
        }

        [HttpDelete("{channelId}/messages/delete")]
        public async Task<IActionResult> DeleteMessage(int channelId, [FromBody] DeleteMessageRequest request)
        {
            var deleted = await _messageService.DeleteMessage(request);
            if (deleted == null)
            {
                return NotFound("Message not found.");
            }
            return Ok(deleted);
        }

        [HttpPut("{channelId}/messages/update")]
        public async Task<IActionResult> UpdateMessage(int channelId, [FromBody] UpdateMessageRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedMessage = await _messageService.UpdateMessage(request);
                return Ok(updatedMessage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
