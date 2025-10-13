namespace server.Domain
{
    public class Device
    {
        public int Id { get; set; }
        public string DeviceId { get; set; } = default!;
        public string DeviceName { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
        public DateTime RefreshTokenExpiryTime { get; set; }
        public string IpAddress { get; set; } = default!;
        public string UserAgent { get; set; } = default!;
        public int UserId { get; set; } = default!;

        public AppUser User { get; set; } = default!;
        }
}
