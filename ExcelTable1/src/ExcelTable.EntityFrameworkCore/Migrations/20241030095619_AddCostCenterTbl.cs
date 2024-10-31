using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExcelTable.Migrations
{
    /// <inheritdoc />
    public partial class AddCostCenterTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CostCenter",
                columns: table => new
                {
                    CostCenterID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CoArea = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CostCenterCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ccOwner = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostCenter", x => x.CostCenterID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CostCenter");
        }
    }
}
