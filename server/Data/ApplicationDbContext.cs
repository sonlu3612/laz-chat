using server.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace server.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<UserVerification> UserVerifications { get; set; }
        public DbSet<UserConnection> UserConnections { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>(entity =>
            {
                entity.ToTable("users");
                entity.Property(u => u.Id).HasColumnName("id");
                entity.Property(u => u.PhoneNumber).HasColumnName("phone");
                entity.Property(u => u.Email).HasColumnName("email");
                entity.Property(u => u.PasswordHash).HasColumnName("password");
                entity.Property(u => u.FirstName).HasColumnName("first_name");
                entity.Property(u => u.LastName).HasColumnName("last_name");
                entity.Property(u => u.IsActive).HasColumnName("is_active");
                entity.Property(u => u.IsReported).HasColumnName("is_reported");
                entity.Property(u => u.IsBlocked).HasColumnName("is_blocked");
                entity.Property(u => u.Preferences).HasColumnName("preferences");
                entity.Property(u => u.CreatedAt).HasColumnName("created_at");
                entity.Property(u => u.UpdatedAt).HasColumnName("updated_at");
                entity.Property(u => u.DeletedAt).HasColumnName("deleted_at");
            });

            builder.Entity<IdentityUserLogin<int>>().ToTable("user_logins");

            builder.Entity<UserVerification>().ToTable("user_verification");

            builder.Entity<UserConnection>(entity =>
            {
                entity.ToTable("user_connections");
                entity.HasKey(uc => uc.Id);
                entity.Property(uc => uc.Id).HasColumnName("id");
                entity.Property(uc => uc.UserId).HasColumnName("user_id");
                entity.Property(uc => uc.ChannelId).HasColumnName("channel_id");
                entity.Property(uc => uc.JoinedAt).HasColumnName("joined_at");
                entity.Property(uc => uc.LeftAt).HasColumnName("left_at");
                entity.HasOne(uc => uc.User)
                      .WithMany()
                      .HasForeignKey(uc => uc.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(uc => uc.Channel)
                      .WithMany()
                      .HasForeignKey(uc => uc.ChannelId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<Channel>(entity =>
            {
                entity.ToTable("channels");
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Id).HasColumnName("id");
                entity.Property(c => c.CreatorId).HasColumnName("creator_id");
                entity.Property(c => c.Title).HasColumnName("title");
                entity.Property(c => c.IsGroupChat).HasColumnName("is_group_chat");
                entity.Property(c => c.Type).HasColumnName("type");
                entity.Property(c => c.CreatedAt).HasColumnName("created_at");
                entity.Property(c => c.UpdatedAt).HasColumnName("updated_at");
                entity.Property(c => c.DeletedAt).HasColumnName("deleted_at");
            });

            builder.Entity<Message>(entity =>
            {
                entity.ToTable("messages");
                entity.HasKey(m => m.Id);
                entity.Property(m => m.Id).HasColumnName("id");
                entity.Property(m => m.ChannelId).HasColumnName("channel_id");
                entity.Property(m => m.UserId).HasColumnName("user_id");
                entity.Property(m => m.Content).HasColumnName("content");
                entity.Property(m => m.SentAt).HasColumnName("sent_at");
                entity.Property(m => m.EditedAt).HasColumnName("edited_at");
                entity.HasOne(m => m.Channel)
                      .WithMany()
                      .HasForeignKey(m => m.ChannelId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(m => m.User)
                      .WithMany()
                      .HasForeignKey(m => m.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}