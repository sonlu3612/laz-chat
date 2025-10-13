namespace server.Dtos.Auths
{
    public class RefreshTokenRequest
    {
        public string DeviceId { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
    }
}
