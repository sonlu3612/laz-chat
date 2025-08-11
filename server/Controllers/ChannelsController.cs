using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Domain;
using server.Dtos;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChannelsController : ControllerBase
{
    private readonly IChannelService _channelService;

    public ChannelsController(IChannelService channelService)
    {
        _channelService = channelService;
    }

    [HttpPost("create")]
    [ProducesResponseType(typeof(Channel), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateChannel([FromBody] CreateChannel createChannel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        else
        {
            try
            {
                var createdChannel = await _channelService.CreateChannelAsync(createChannel);
                return CreatedAtAction(nameof(GetChannelById), new { id = createdChannel.Id }, createdChannel);
            }
            catch
            {
                return BadRequest("Failed to create channel.");
            }
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetChannelById(int id)
    {
        var channel = await _channelService.GetChannelByIdAsync(id);
        if (channel == null)
        {
            return NotFound();
        }
        return Ok(channel);
    }

    [HttpGet("GetChannelByTitle")]
    public async Task<IActionResult> GetChannelByTitle(string title)
    {
        var channel = await _channelService.GetChannelByTitleAsync(title);
        if (channel == null)
        {
            return NotFound("Channel not found.");
        }
        return Ok(channel);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllChannels()
    {
        var channels = await _channelService.GetAllChannelsAsync();
        if (channels == null || !channels.Any())
        {
            return NotFound("No channels found.");
        }
        else
        {
            return Ok(channels);
        }
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateChannel([FromBody] Channel channel)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var updated = await _channelService.UpdateChannelAsync(channel);
        return updated ? NoContent() : BadRequest("Failed to update channel.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteChannel(int id)
    {
        var deleted = await _channelService.DeleteChannelAsync(id);
        if (deleted)
        {
            return NoContent();
        }
        else
        {
            return NotFound("Channel not found.");
        }
    }

    [HttpGet("{channelId}/messages")]
    public async Task<IActionResult> GetMessagesByChannelId(int channelId)
    {
        var messages = await _channelService.GetMessagesByChannelIdAsync(channelId);
        if (messages == null || !messages.Any())
        {
            return NotFound("No messages found for this channel.");
        }
        return Ok(messages);
    }

    [HttpPost("{channelId}/messages/send")]
    public async Task<IActionResult> SendMessage(int channelId, [FromBody] Message message)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        message.ChannelId = channelId;
        var sentMessage = await _channelService.SendMessageAsync(message);
        if (sentMessage == null)
        {
            return BadRequest("Failed to send message.");
        }
        return CreatedAtAction(nameof(GetMessagesByChannelId), new { channelId = message.ChannelId }, sentMessage);
    }

    [HttpDelete("messages/{messageId}")]
    public async Task<IActionResult> DeleteMessage(int messageId)
    {
        var deleted = await _channelService.DeleteMessageAsync(messageId);
        return deleted ? NoContent() : NotFound("Message not found.");
    }
}