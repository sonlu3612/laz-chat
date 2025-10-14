using AutoMapper;
using server.Dtos.Users;
using server.Data;
using Microsoft.EntityFrameworkCore;

namespace server.Services.Users
{
    public class ProfileService(ApplicationDbContext context, IMapper mapper) : IProfileService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        public async Task<ProfileResponse> GetProfileAsync(ProfileResponse profile)
        {
            try
            {
                var user = await _context.Users
                    .AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Id == profile.Id);
                if (user == null)
                {
                    throw new KeyNotFoundException("User not found");
                }
                return _mapper.Map<ProfileResponse>(user);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error retrieving profile: {ex.Message}");
            }
        }

        public async Task<string> UpdateAvatarAsync(UpdateAvartarRequest request)
        {
            try
            {
                var profile = _context.Profiles.FirstOrDefault(u => u.Id == request.UserId) ?? throw new KeyNotFoundException("User not found");
                profile.AvatarUrl = request.AvatarUrl;
                profile.UpdatedAt = DateTime.UtcNow;
                _context.Profiles.Update(profile);
                await _context.SaveChangesAsync();
                return profile.AvatarUrl;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error updating avatar: {ex.Message}");
            }
        }

        public async Task<bool> UpdateProfileAsync(UpdateProfileRequest request)
        {
            try
            {
                var profile = _context.Profiles.FirstOrDefault(u => u.Id == request.UserId) ?? throw new KeyNotFoundException("User not found");
                profile.FullName = request.FullName;
                profile.Bio = request.Bio;
                profile.UpdatedAt = DateTime.UtcNow;
                _context.Profiles.Update(profile);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error updating profile: {ex.Message}");
            }
        }
    }
}
