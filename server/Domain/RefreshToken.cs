namespace server.Domain
{
    public class RefreshToken
    {
        public string Token { get; set; } = default!;
        public DateTime Expires { get; set; }
    }
}
