using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CheckoutAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddDeviceAndDeviceSpecTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Devices",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Devices",
                newName: "OldPrice");

            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "BestDeal",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Discounted",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Offer",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Percent",
                table: "Devices",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "DeviceSpecs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Spec = table.Column<string>(type: "TEXT", nullable: false),
                    DeviceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceSpecs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeviceSpecs_Devices_DeviceId",
                        column: x => x.DeviceId,
                        principalTable: "Devices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Devices",
                columns: new[] { "Id", "Available", "BestDeal", "Discounted", "Image", "Name", "Offer", "OldPrice", "Percent", "Price", "Type" },
                values: new object[,]
                {
                    { 1, true, false, true, "/media/steamdeck.png", "Steam Deck OLED 512GB", "Free shipping + 200 games", 2799m, 7.1500000000000004, 2599m, "Steam Deck" },
                    { 2, true, false, true, "/media/steamdeck.png", "Steam Deck 1TB Limited Edition", "Exclusive colorway + travel case", 3149m, 7.9500000000000002, 2899m, "Steam Deck" },
                    { 3, false, false, false, "/media/rogallywhite.png", "ROG Ally 1TB Z1 Extreme", "Free shipping + Meta+ subscription", 2799m, 14.289999999999999, 2399m, "ROG Ally" },
                    { 4, false, false, false, "/media/rogallyblack.png", "ROG Ally 512GB Z1 Non-Extreme", "Budget-friendly bundle with charger", 2199m, 9.0999999999999996, 1999m, "ROG Ally" },
                    { 5, true, false, true, "/media/lenovogo.png", "Legion Go 1TB", "3 Months Xbox Game Pass + 200 Games", 2899m, 10.35, 2599m, "Lenovo Go" },
                    { 6, false, false, false, "/media/msiclaw.png", "MSI Claw 128GB", "Get Asgard’s Wrath 2 with purchase", 2399m, 12.51, 2099m, "MSI Claw" },
                    { 7, true, false, true, "/media/msiclaw.png", "MSI Claw 512GB", "Includes exclusive MSI travel pouch", 2699m, 7.4100000000000001, 2499m, "MSI Claw" }
                });

            migrationBuilder.InsertData(
                table: "DeviceSpecs",
                columns: new[] { "Id", "DeviceId", "Spec" },
                values: new object[,]
                {
                    { 1, 1, "7.4” HDR OLED display, 1280x800 resolution, up to 90Hz" },
                    { 2, 1, "AMD APU: Zen 2 4-core, RDNA 2 GPU with 8 CUs" },
                    { 3, 1, "16GB LPDDR5 RAM (6400 MT/s)" },
                    { 4, 1, "512GB NVMe SSD" },
                    { 5, 1, "Wi-Fi 6E, Bluetooth 5.3" },
                    { 6, 1, "50Whr battery, 3–12 hours of gameplay" },
                    { 7, 1, "Dual ambient light sensors" },
                    { 8, 1, "SteamOS 3.0" },
                    { 9, 2, "7.4” HDR OLED screen, etched anti-glare glass" },
                    { 10, 2, "AMD APU: Zen 2 4-core, RDNA 2 GPU with 8 CUs" },
                    { 11, 2, "16GB LPDDR5 RAM (6400 MT/s)" },
                    { 12, 2, "1TB NVMe SSD" },
                    { 13, 2, "Wi-Fi 6E, Bluetooth 5.3" },
                    { 14, 2, "50Whr battery" },
                    { 15, 3, "7” FHD 1080p IPS touchscreen, 120Hz refresh rate" },
                    { 16, 3, "AMD Ryzen Z1 Extreme, 8-core/16-thread, 12 RDNA 3 CUs" },
                    { 17, 3, "16GB LPDDR5 RAM (6400 MT/s)" },
                    { 18, 3, "1TB PCIe 4.0 SSD" },
                    { 19, 3, "Wi-Fi 6E, Bluetooth 5.2" },
                    { 20, 3, "Windows 11 Home" },
                    { 21, 3, "ROG Armoury Crate SE" },
                    { 22, 3, "Support for XG Mobile eGPU" },
                    { 23, 4, "7” FHD 1080p IPS touchscreen, 120Hz refresh rate" },
                    { 24, 4, "AMD Ryzen Z1, 6-core/12-thread, 4 RDNA 3 CUs" },
                    { 25, 4, "16GB LPDDR5 RAM (6400 MT/s)" },
                    { 26, 4, "512GB PCIe 4.0 SSD" },
                    { 27, 4, "Wi-Fi 6E, Bluetooth 5.2" },
                    { 28, 4, "Windows 11 Home" },
                    { 29, 4, "Adaptive Cooling System" },
                    { 30, 4, "Support for XG Mobile" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceSpecs_DeviceId",
                table: "DeviceSpecs",
                column: "DeviceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeviceSpecs");

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DropColumn(
                name: "Available",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "BestDeal",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Discounted",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Offer",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Percent",
                table: "Devices");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Devices",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "OldPrice",
                table: "Devices",
                newName: "Description");
        }
    }
}
