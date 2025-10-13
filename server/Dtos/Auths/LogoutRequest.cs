namespace server.Dtos.Auths
{
    public class LogoutRequest
    {
        public string DeviceId { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}
