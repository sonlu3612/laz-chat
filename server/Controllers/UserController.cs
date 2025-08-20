using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService _userService) : ControllerBase
    {
        public readonly IUserService userService = _userService;
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }
    }
}
