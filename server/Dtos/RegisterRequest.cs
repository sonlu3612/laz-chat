using System.ComponentModel.DataAnnotations;

namespace server.Dtos;

public class RegisterRequest
{
    [Required(ErrorMessage = "First name is required!")]
    [StringLength(20, ErrorMessage = "First name must not exceed 20 characters!")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Last name is required!")]
    [StringLength(20, ErrorMessage = "Last name must not exceed 20 characters!")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required!")]
    [EmailAddress(ErrorMessage = "Invalid email format!")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Phone is required!")]
    [Phone(ErrorMessage = "Invalid phone number format!")]
    public string PhoneNumber { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
    public string Password { get; set; } = string.Empty;
}