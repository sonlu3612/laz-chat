using AutoMapper;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Domain;
using server.Dtos.Auths;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace server.Services.Auth;

public class  AuthService(ApplicationDbContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IHttpContextAccessor httpContextAccessor, IConfiguration configuration, IMapper mapper) : IAuthService
{
    public readonly ApplicationDbContext _context = context;
    public readonly UserManager<AppUser> _userManager = userManager;
    public readonly SignInManager<AppUser> _signInManager = signInManager;
    public readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
    public readonly IConfiguration _configuration = configuration;
    public readonly IMapper _mapper = mapper;

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

        var accessToken = await GenerateJwtToken(user);

        var response = _mapper.Map<AuthResponse>(user);
        response.AccessToken = accessToken;
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

        var accessToken = await GenerateJwtToken(user);   

        var refreshToken = GenerateRefreshToken();

        var device = await _context.Devices
            .FirstOrDefaultAsync(d => d.UserId == user.Id && d.DeviceId == request.DeviceId);

        if (device == null)
        {
            device = new Device
            {
                UserId = user.Id,
                DeviceId = request.DeviceId,
                DeviceName = request.DeviceName,
                IpAddress = _httpContextAccessor.HttpContext!.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                UserAgent = _httpContextAccessor.HttpContext!.Request.Headers["User-Agent"].ToString(),
            };
            _context.Devices.Add(device);
        }
        else
        {
            device.RefreshToken = refreshToken.Token;
            device.RefreshTokenExpiryTime = refreshToken.Expires;
            await _context.SaveChangesAsync();
        }
        
        var response = _mapper.Map<AuthResponse>(user);
        response.AccessToken = accessToken;
        response.RefreshToken = refreshToken.Token;
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

        var accessToken = await GenerateJwtToken(user);
        
        var response = _mapper.Map<AuthResponse>(user);
        response.AccessToken = accessToken;
        return response;
        
    }

    public async Task<AuthResponse> RefreshTokenAsync(RefreshTokenRequest request)
    {
        var device = _context.Devices
            .FirstOrDefault(d => d.DeviceId == request.DeviceId && d.RefreshToken == request.RefreshToken);

        if (device == null || device.RefreshTokenExpiryTime <= DateTime.UtcNow)
            throw new Exception("Invalid or expired refresh token.");

        var user = _userManager.FindByIdAsync(device.UserId.ToString()).Result;
        if (user == null)
            throw new Exception("User not found.");

        var newAccessToken = GenerateJwtToken(user).Result;
        var newRefreshToken = GenerateRefreshToken();

        device.RefreshToken = newRefreshToken.Token;
        device.RefreshTokenExpiryTime = newRefreshToken.Expires;

        await _context.SaveChangesAsync();

        return new AuthResponse
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken.Token
        };
    }

    public async Task<AuthResponse> LogoutAsync(LogoutRequest request)
    {
        var device = await _context.Devices
            .FirstOrDefaultAsync(d => d.UserId == request.UserId && d.DeviceId == request.DeviceId);
        if (device == null)
            throw new Exception("Device not found.");

        device.RefreshToken = string.Empty;
        device.RefreshTokenExpiryTime = DateTime.MinValue;
        await _context.SaveChangesAsync();
        return new AuthResponse { Message = "Logged out successfully." };
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

    private RefreshToken GenerateRefreshToken()
    {
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);

        return new RefreshToken
        {
            Token = Convert.ToBase64String(randomBytes),
            Expires = DateTime.UtcNow.AddDays(7)
        };
    }
}