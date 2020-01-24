using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreDatabase.Migrations
{
    public partial class vacationDays : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VacationDays",
                columns: table => new
                {
                    VacationDayID = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    UserId = table.Column<int>(nullable: false),
                    From = table.Column<DateTime>(nullable: false),
                    To = table.Column<DateTime>(nullable: false),
                    Reason = table.Column<string>(nullable: true),
                    State = table.Column<short>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacationDays", x => x.VacationDayID);
                    table.ForeignKey(
                        name: "FK_VacationDays_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VacationDays_UserId",
                table: "VacationDays",
                column: "UserId");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                name: "VacationDays");

        }
    }
}
