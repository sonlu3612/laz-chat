using server.Dtos.Users;

namespace server.Services.Users
{
    public interface IProfileService
    {
        Task<ProfileResponse> GetProfileAsync(ProfileResponse profile);
        Task<bool> UpdateProfileAsync(UpdateProfileRequest request);
        Task<string> UpdateAvatarAsync(UpdateAvartarRequest request);
    }
}