using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Auths;

public class LoginRequest
{
    [Required(ErrorMessage = "Email is required!")]
    [EmailAddress(ErrorMessage = "Invalid email format!")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    public string Password { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Device id is required.")]
    public string DeviceId { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Device name is required.")]
    public string DeviceName { get; set; } = string.Empty;
}