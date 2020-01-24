using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreDatabase.Migrations
{
    public partial class userModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserModels",
                columns: table => new
                {
                    ClientId = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    County = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Sal = table.Column<short>(nullable: false),
                    Reg = table.Column<short>(nullable: false),
                    Vmg = table.Column<short>(nullable: false),
                    Ail = table.Column<short>(nullable: false),
                    Asf = table.Column<short>(nullable: false),
                    Imp = table.Column<short>(nullable: false),
                    Con = table.Column<short>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModels", x => x.ClientId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserModels");
        }
    }
}
