using server.Dtos;
using server.Domain;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using AutoMapper;

namespace server.Services;

public class  AuthService : IAuthService
{
    public readonly UserManager<AppUser> _userManager;
    public readonly SignInManager<AppUser> _signInManager;
    public readonly IConfiguration _configuration;
    public readonly IMapper _mapper;

    public AuthService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IConfiguration configuration, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _mapper = mapper;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        if (await _userManager.FindByEmailAsync(request.Email) != null)
        {   
            throw new Exception("Email already exists.");
        }
        
        var user = _mapper.Map<AppUser>(request);
        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;
        user.IsActive = true;

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
        }

        var token = await GenerateJwtToken(user);

        var response = _mapper.Map<AuthResponse>(user);
        response.Token = token;
        return response;
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            throw new Exception("Invalid email or password.");
        }

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, false);
        if (!result.Succeeded)
        {
            throw new Exception("Invalid email or password.");
        }

        var token = await GenerateJwtToken(user);
        
        var response = _mapper.Map<AuthResponse>(user);
        response.Token = token;
        return response;
    }

    public async Task<AuthResponse> GoogleLoginAsync(GoogleLoginRequest request)
    {
        var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token);
        var email = payload.Email;

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new AppUser
            {
                UserName = email,
                Email = email,
                FirstName = payload.GivenName ?? string.Empty,
                LastName = payload.FamilyName ?? string.Empty,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsActive = true
            };

            var createResult = await _userManager.CreateAsync(user);
            if (!createResult.Succeeded)
            {
                throw new Exception(string.Join(", ", createResult.Errors.Select(e => e.Description)));
            }

            await _userManager.AddLoginAsync(user, new UserLoginInfo("Google", payload.Subject, "Google"));
        }
        else
        {
            var loginInfo = new UserLoginInfo("Google", payload.Subject, "Google");
            var result = await _signInManager.ExternalLoginSignInAsync(
                loginInfo.LoginProvider, loginInfo.ProviderKey, isPersistent: false);

            if (!result.Succeeded)
            {
                await _userManager.AddLoginAsync(user, loginInfo);
            }
        }

        var token = await GenerateJwtToken(user);
        
        var response = _mapper.Map<AuthResponse>(user);
        response.Token = token;
        return response;
        
    }

    private Task<string> GenerateJwtToken(AppUser user)
    {
        var claims = new[]
        {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

        var jwtKey = _configuration["JwtConfig:SecretKey"];
        if (string.IsNullOrEmpty(jwtKey))
            throw new Exception("JWT key is missing in configuration");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds);

        return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
    }
}