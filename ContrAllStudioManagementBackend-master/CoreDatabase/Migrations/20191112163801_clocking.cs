using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreDatabase.Migrations
{
    public partial class clocking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<short>(
                name: "Vmg",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Sal",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Reg",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Imp",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Con",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Asf",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Ail",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.CreateTable(
                name: "Dates",
                columns: table => new
                {
                    DateId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    CurrentDate = table.Column<DateTime>(nullable: false),
                    Time = table.Column<float>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dates", x => x.DateId);
                    table.ForeignKey(
                        name: "FK_Dates_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Clocking",
                columns: table => new
                {
                    ClockingId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    DateId = table.Column<int>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clocking", x => x.ClockingId);
                    table.ForeignKey(
                        name: "FK_Clocking_Dates_DateId",
                        column: x => x.DateId,
                        principalTable: "Dates",
                        principalColumn: "DateId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clocking_DateId",
                table: "Clocking",
                column: "DateId");

            migrationBuilder.CreateIndex(
                name: "IX_Dates_UserId",
                table: "Dates",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clocking");

            migrationBuilder.DropTable(
                name: "Dates");

            migrationBuilder.AlterColumn<short>(
                name: "Vmg",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Sal",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Reg",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Imp",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Con",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Asf",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "Ail",
                table: "UserModels",
                nullable: false,
                oldClrType: typeof(short));
        }
    }
}
