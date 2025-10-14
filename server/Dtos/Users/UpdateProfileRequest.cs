namespace server.Dtos.Users
{
    public class UpdateProfileRequest
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public bool Gender { get; set; }
    }
}
