using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CheckoutAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddSpecificationsColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "DeviceSpecs",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.AddColumn<string>(
                name: "Specifications",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                column: "Specifications",
                value: "[\"7.4” HDR OLED display, 1280x800 resolution, up to 90Hz\",\"AMD APU: Zen 2 4-core, RDNA 2 GPU with 8 CUs\",\"16GB LPDDR5 RAM (6400 MT/s)\",\"512GB NVMe SSD\",\"Wi-Fi 6E, Bluetooth 5.3\",\"50Whr battery, 3–12 hours of gameplay\",\"Dual ambient light sensors\",\"SteamOS 3.0\"]");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2,
                column: "Specifications",
                value: "[\"7.4” HDR OLED screen, etched anti-glare glass\",\"AMD APU: Zen 2 4-core, RDNA 2 GPU with 8 CUs\",\"16GB LPDDR5 RAM (6400 MT/s)\",\"1TB NVMe SSD\",\"Wi-Fi 6E, Bluetooth 5.3\",\"50Whr battery\",\"Custom startup movie and virtual theme\",\"SteamOS 3.0\"]");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3,
                column: "Specifications",
                value: "[\"7” FHD 1080p IPS touchscreen, 120Hz refresh rate\",\"AMD Ryzen Z1 Extreme, 8-core/16-thread, 12 RDNA 3 CUs\",\"16GB LPDDR5 RAM (6400 MT/s)\",\"1TB PCIe 4.0 SSD\",\"Wi-Fi 6E, Bluetooth 5.2\",\"Windows 11 Home\",\"ROG Armoury Crate SE\",\"Support for XG Mobile eGPU\"]");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 4,
                column: "Specifications",
                value: "[\"7” FHD 1080p IPS touchscreen, 120Hz refresh rate\",\"AMD Ryzen Z1, 6-core/12-thread, 4 RDNA 3 CUs\",\"16GB LPDDR5 RAM (6400 MT/s)\",\"512GB PCIe 4.0 SSD\",\"Wi-Fi 6E, Bluetooth 5.2\",\"Windows 11 Home\",\"Adaptive Cooling System\",\"Support for XG Mobile\"]");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 5,
                column: "Specifications",
                value: "[\"8.8” WQXGA (2560 x 1600) IPS touchscreen, 144Hz\",\"AMD Ryzen Z1 Extreme, 8-core/16-thread, RDNA 3\",\"16GB LPDDR5X RAM (7500 MT/s)\",\"1TB PCIe 4.0 SSD\",\"Wi-Fi 6E, Bluetooth 5.2\",\"Windows 11 Home\",\"Detachable Hall Effect controllers\",\"49.2Whr battery with fast charge\"]");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 6,
                column: "Specifications",
                value: "[\"7” FHD (1920 x 1080) IPS touchscreen, 120Hz\",\"Intel Core Ultra 5 135H, Intel Arc GPU\",\"16GB LPDDR5 RAM\",\"128GB PCIe Gen 4 SSD\",\"Wi-Fi 7, Bluetooth 5.4\",\"Windows 11 Home\",\"53Whr battery, Cooler Boost\",\"Hall Effect triggers and sticks\"]");

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 7,
                column: "Specifications",
                value: "[\"7” FHD (1920 x 1080) IPS touchscreen, 120Hz\",\"Intel Core Ultra 7 155H, Intel Arc GPU\",\"16GB LPDDR5 RAM\",\"512GB PCIe Gen 4 SSD\",\"Wi-Fi 7, Bluetooth 5.4\",\"Windows 11 Home\",\"53Whr battery, Cooler Boost HyperFlow\",\"Hall Effect triggers and sticks\"]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Specifications",
                table: "Devices");

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
        }
    }
}
