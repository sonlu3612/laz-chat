namespace server.Dtos.Users
{
    public class UpdateAvartarRequest
    {
        public string AvatarUrl { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}
