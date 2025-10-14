using server.Services.Users;
using server.Dtos.Users;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    public class ProfileController(IProfileService profileService) : ControllerBase
    {
        public Task<ProfileResponse> GetProfile([FromBody] ProfileResponse profile)
        {
            return profileService.GetProfileAsync(profile);
        }

        public Task<bool> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            return profileService.UpdateProfileAsync(request);
        }

        public Task<string> UpdateAvatar([FromBody] UpdateAvartarRequest request)
        {
            return profileService.UpdateAvatarAsync(request);
        }
    }
}
