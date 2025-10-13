using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dtos.Users;
using server.Services.Users;

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

        [HttpGet("{userId}/by-username")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            var user = await userService.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }

        [HttpGet("all-user")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var result = await userService.DeleteUserAsync(userId);
            if (!result)
            {
                return NotFound("User not found or could not be deleted.");
            }
            return NoContent();
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] UpdateUserRequest request)
        {
            var result = await userService.UpdateUserAsync(userId, request.Username, request.Email);
            if (!result)
            {
                return NotFound("User not found or could not be updated.");
            }
            return NoContent();
        }

        [HttpDelete("{userId}/change-password")]
        public async Task<IActionResult> ChangePassword(int userId, [FromBody] string newPassword)
        {
            var result = await userService.ChangePasswordAsync(userId, newPassword);
            if (!result)
            {
                return NotFound("User not found or password could not be changed.");
            }
            return NoContent();
        }

        [HttpGet("devices")]
        public async Task<IActionResult> GetDevices(int userId)
        {
           try 
           {
               var devices = await userService.GetDeviceAsync(userId);
               return Ok(devices);
           }
           catch (KeyNotFoundException ex)
           {
               return NotFound(ex.Message);
            }
        }
    }
}
