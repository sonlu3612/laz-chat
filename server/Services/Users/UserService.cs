using server.Domain;
using server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace server.Services.Users
{
    public class UserService(ApplicationDbContext context) : IUserService
    {
        public readonly ApplicationDbContext _context = context;
        public async Task<bool> UpdateUserAsync(int userId, string username, string email)
        {
            var user = await _context.Users.FindAsync (userId)
                      ?? throw new KeyNotFoundException("User not found");
            user.UserName = username;
            user.Email = email;
            user.UpdatedAt = DateTime.UtcNow;
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId)
                      ?? throw new KeyNotFoundException("User not found");
            _context.Users.Remove(user);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<AppUser> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId)
                      ?? throw new KeyNotFoundException("User not found");
            return user;
        }
        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == username)
                ?? throw new KeyNotFoundException("User not found");
            return user;
        }
        public async Task<IEnumerable<AppUser>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync()
                      ?? throw new KeyNotFoundException("No users found");
            return users;
        }
        public async Task<bool> ChangePasswordAsync(int userId, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId)
                      ?? throw new KeyNotFoundException("User not found");
            var passwordHasher = new PasswordHasher<AppUser>();
            user.PasswordHash = passwordHasher.HashPassword(user, newPassword);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
