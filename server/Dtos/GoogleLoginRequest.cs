using System.ComponentModel.DataAnnotations;

namespace server.Dtos;

public class GoogleLoginRequest
{
    [Required(ErrorMessage = "Google token is required!")]
    public string Token { get; set; } = string.Empty;
}