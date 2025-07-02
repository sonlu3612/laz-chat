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

        public class RegisterRequest // Data Transfer Object
        {
            [Required(ErrorMessage = "Username is required!")]
            [StringLength(20, ErrorMessage = "Username must not exceed 20 characters!")]
            public string Username { get; set; } = string.Empty;

            [Required(ErrorMessage = "Email is required!")]
            [EmailAddress(ErrorMessage = "Invalid email format!")]
            public string Email { get; set; } = string.Empty;

            [Required(ErrorMessage = "Password is required.")]
            [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
            public string Password { get; set; } = string.Empty;

            [Required(ErrorMessage = "Confirm Password is required.")]
            [Compare("Password", ErrorMessage = "Passwords do not match.")]
            public string ConfirmPassword { get; set; } = string.Empty;
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