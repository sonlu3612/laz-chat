using server.Domain;

namespace server.Services.Users
{
    public interface IUserService
    {
        Task<bool> UpdateUserAsync(int userId, string username, string email);
        Task<bool> DeleteUserAsync(int userId);
        Task<AppUser> GetUserByIdAsync(int userId);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<IEnumerable<AppUser>> GetAllUsersAsync();
        Task<bool> ChangePasswordAsync(int userId, string newPassword);
        Task<IEnumerable<Device>> GetDeviceAsync(int userId);
    }
}