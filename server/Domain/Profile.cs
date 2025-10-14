namespace server.Domain
{
    public class Profile
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty!;
        public string PhoneNumber { get; set; } = string.Empty!;
        public DateTime BirthDay { get; set; }
        public Boolean Gender { get; set; }
        public int UserId { get; set; } = default!;
        public AppUser User { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
