using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("Users")]
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }
    }
}
