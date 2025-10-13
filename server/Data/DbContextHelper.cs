namespace server.Data
{
    public static class DbContextHelper
    {
        public static string GetConnectionString()
        {
            DotNetEnv.Env.Load(Path.Combine(Directory.GetCurrentDirectory(), ".env"));

            return $"Host={Environment.GetEnvironmentVariable("DB_HOST")};" +
                   $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
                   $"Username={Environment.GetEnvironmentVariable("DB_USER")};" +
                   $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";
        }
    }
}
