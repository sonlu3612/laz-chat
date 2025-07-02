using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        // Endpoint không yêu cầu xác thực
        [HttpGet("public")]
        public IActionResult PublicEndpoint()
        {
            return Ok(new { message = "Ai cũng truy cập được" });
        }

        // Endpoint yêu cầu xác thực
        [Authorize] // <-- Middleware xác thực
        [HttpGet("secure")]
        public IActionResult SecureEndpoint()
        {
            return Ok(new {
                message = "Chỉ truy cập được khi đã đăng nhập",
                user = User.Identity?.Name ?? "unknown",
                claims = User.Claims.Select(c => new { c.Type, c.Value })
            });
        }
    }
}