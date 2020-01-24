using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreDatabase.Migrations
{
    public partial class clockings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clocking");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Dates");

            migrationBuilder.AddColumn<int>(
                name: "Hours",
                table: "Dates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Minutes",
                table: "Dates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Seconds",
                table: "Dates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Clockings",
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
                    table.PrimaryKey("PK_Clockings", x => x.ClockingId);
                    table.ForeignKey(
                        name: "FK_Clockings_Dates_DateId",
                        column: x => x.DateId,
                        principalTable: "Dates",
                        principalColumn: "DateId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clockings_DateId",
                table: "Clockings",
                column: "DateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clockings");

            migrationBuilder.DropColumn(
                name: "Hours",
                table: "Dates");

            migrationBuilder.DropColumn(
                name: "Minutes",
                table: "Dates");

            migrationBuilder.DropColumn(
                name: "Seconds",
                table: "Dates");

            migrationBuilder.AddColumn<float>(
                name: "Time",
                table: "Dates",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateTable(
                name: "Clocking",
                columns: table => new
                {
                    ClockingId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    DateId = table.Column<int>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false)
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
        }
    }
}
