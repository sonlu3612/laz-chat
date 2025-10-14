using server.Domain;
using server.Dtos.Auths;
using server.Dtos.Channels;
using server.Dtos.Users;

namespace server.Mappings
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateChannelRequest, Channel>();

            CreateMap<RegisterRequest, AppUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

            CreateMap<AppUser, AuthResponse>();

            CreateMap<AppUser, ProfileResponse>()
                .ReverseMap();
        }
    }
}
