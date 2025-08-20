using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Domain;
using server.Dtos.Channels;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChannelsController(IChannelService channelService) : ControllerBase
{
    private readonly IChannelService _channelService = channelService;

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
}