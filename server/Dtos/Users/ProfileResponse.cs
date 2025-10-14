namespace server.Dtos.Users
{
    public class ProfileResponse
    {
        public int Id { get; set; }
        public string Bio { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty!;
        public string PhoneNumber { get; set; } = string.Empty!;
        public DateTime BirthDay { get; set; }
        public Boolean Gender { get; set; }
    }
}
