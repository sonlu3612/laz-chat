using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddDeviceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "created_at",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "device_token",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "type",
                table: "devices");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "devices",
                newName: "refresh_token_expiry_time");

            migrationBuilder.AddColumn<string>(
                name: "device_id",
                table: "devices",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "device_name",
                table: "devices",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ip_address",
                table: "devices",
                type: "character varying(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "refresh_token",
                table: "devices",
                type: "character varying(512)",
                maxLength: 512,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "user_agent",
                table: "devices",
                type: "character varying(512)",
                maxLength: 512,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "devices",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_devices_refresh_token",
                table: "devices",
                column: "refresh_token");

            migrationBuilder.CreateIndex(
                name: "IX_devices_user_id_device_id",
                table: "devices",
                columns: new[] { "user_id", "device_id" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_devices_users_user_id",
                table: "devices",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_devices_users_user_id",
                table: "devices");

            migrationBuilder.DropIndex(
                name: "IX_devices_refresh_token",
                table: "devices");

            migrationBuilder.DropIndex(
                name: "IX_devices_user_id_device_id",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "device_id",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "device_name",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "ip_address",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "refresh_token",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "user_agent",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "devices");

            migrationBuilder.RenameColumn(
                name: "refresh_token_expiry_time",
                table: "devices",
                newName: "updated_at");

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "devices",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "device_token",
                table: "devices",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "type",
                table: "devices",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
