using server.Domain;
using server.Data;

namespace server.Services
{
    public class UserService(ApplicationDbContext context) : IUserService
    {
        public readonly ApplicationDbContext _context = context;
        public Task<bool> UpdateUserAsync(int userId, string username, string email)
        {
            // Implementation for updating a user
            throw new NotImplementedException();
        }
        public Task<bool> DeleteUserAsync(int userId)
        {
            // Implementation for deleting a user
            throw new NotImplementedException();
        }
        public async Task<AppUser> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId)
                      ?? throw new KeyNotFoundException("User not found");
            return user;
        }
        public Task<AppUser> GetUserByUsernameAsync(string username)
        {
            // Implementation for getting a user by username
            throw new NotImplementedException();
        }
        public Task<IEnumerable<AppUser>> GetAllUsersAsync()
        {
            // Implementation for getting all users
            throw new NotImplementedException();
        }
        public Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
        {
            // Implementation for changing a user's password
            throw new NotImplementedException();
        }
        public Task<bool> ResetPasswordAsync(int userId, string newPassword)
        {
            // Implementation for resetting a user's password
            throw new NotImplementedException();
        }
    }
}
