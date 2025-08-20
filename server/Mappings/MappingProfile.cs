using AutoMapper;
using server.Domain;
using server.Dtos.Auth;
using server.Dtos.Channels;
using System.IdentityModel.Tokens.Jwt;

namespace server.Mappings
{
    public class MappingProfile :  Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateChannel, Channel>();
            CreateMap<RegisterRequest, AppUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
            CreateMap<AppUser, AuthResponse>();
        }
    }   
}
