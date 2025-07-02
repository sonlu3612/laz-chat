using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAuthService _authService; // Sửa lỗi chính tả: _authServive -> _authService

        public UsersController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {
            try
            {
                var user = await _authService.Register(userDTO);
                return Ok(new { message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message }); // Cải thiện định dạng phản hồi lỗi
            }
        }

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            try
            {
                var token = await _authService.Login(loginDTO);
                return Ok(new { message = "User login successfully", token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message }); // Cải thiện định dạng phản hồi lỗi
            }
        }
    }
}