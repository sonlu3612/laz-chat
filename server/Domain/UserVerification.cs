using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Domain;

public class UserVerification
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UsersId { get; set; }
    public string VerificationCode { get; set; } = string.Empty;
    public string CreatedAt { get; set; } = string.Empty;
}