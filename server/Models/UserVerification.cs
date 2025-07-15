using System;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class UserVerification
{
    [Key]
    public int UsersId { get; set; }
    public string VerificationCode { get; set; } = string.Empty;
    public string CreatedAt { get; set; } = string.Empty;
}