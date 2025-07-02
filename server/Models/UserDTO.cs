using System.ComponentModel.DataAnnotations;

namespace AuthJwtApi.Models
{
    public class UserDTO // Data Transfer Object
    {
        [Required(ErrorMessage = "Username is required!")]
        [StringLength(20, ErrorMessage = "Username must not exceed 20 characters!")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress(ErrorMessage = "Invalid email format!")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirm Password is required.")]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
