using server.Models;

namespace server.Services
{
    public interface IAuthService
    {
        Task<User> Register(UserDTO userDTO);
        Task<string> Login(LoginDTO loginDTO);
    }
}