using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using AuthJwtApi.Data;
using AuthJwtApi.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // Inject service
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration; // read JWT settings

        public UsersController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/users/register
        [HttpPost]
        public async Task<IActionResult> Register(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                return BadRequest("Username already exists.");
            }

            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Email already exists.");
            }

            user.Password = user.Password;

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Success" });
        }

        // POST: api/users/login
        [HttpPost]
        public async Task<IActionResult> Login(User user)
        {
            
        }

    }

}