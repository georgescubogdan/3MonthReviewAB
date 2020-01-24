using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreDatabase.Migrations
{
    public partial class shouldGetPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "ShouldGetPassword",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: (short)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "ShouldGetPassword",
                table: "AspNetUsers");
        }
    }
}
