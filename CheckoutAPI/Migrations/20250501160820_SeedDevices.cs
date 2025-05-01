using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CheckoutAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedDevices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Orders",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "ShippingMethod",
                table: "Orders",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Orders",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Orders",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Variant",
                table: "OrderItems",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "OrderItems",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "OrderItems",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "OrderItems",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "OrderItems",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Favorites",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "Favorites",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Favorites",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Spec",
                table: "DeviceSpecs",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "DeviceSpecs",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "DeviceSpecs",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Devices",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Specifications",
                table: "Devices",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Devices",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<double>(
                name: "Percent",
                table: "Devices",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "REAL");

            migrationBuilder.AlterColumn<decimal>(
                name: "OldPrice",
                table: "Devices",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Offer",
                table: "Devices",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Devices",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Devices",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<bool>(
                name: "Discounted",
                table: "Devices",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<bool>(
                name: "BestDeal",
                table: "Devices",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<bool>(
                name: "Available",
                table: "Devices",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Devices",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { true, false, true, 2799m, 7.1500000000000004, 2599m });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { true, false, true, 3149m, 7.9500000000000002, 2899m });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { false, false, false, 2799m, 14.289999999999999, 2399m });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { false, false, false, 2199m, 9.0999999999999996, 1999m });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { true, false, true, 2899m, 10.35, 2599m });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { false, false, false, 2399m, 12.51, 2099m });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { true, false, true, 2699m, 7.4100000000000001, 2499m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Users",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Orders",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "ShippingMethod",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "OrderDate",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Orders",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Variant",
                table: "OrderItems",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "OrderItems",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "OrderItems",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "OrderItems",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "OrderItems",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Favorites",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "Favorites",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Favorites",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Spec",
                table: "DeviceSpecs",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "DeviceSpecs",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "DeviceSpecs",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Specifications",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Price",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<float>(
                name: "Percent",
                table: "Devices",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<string>(
                name: "OldPrice",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<string>(
                name: "Offer",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Discounted",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<int>(
                name: "BestDeal",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<int>(
                name: "Available",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Devices",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { 1, 0, 1, "2799", 7.15f, "2599" });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { 1, 0, 1, "3149", 7.95f, "2899" });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { 0, 0, 0, "2799", 14.29f, "2399" });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { 0, 0, 0, "2199", 9.1f, "1999" });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { 1, 0, 1, "2899", 10.35f, "2599" });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { 0, 0, 0, "2399", 12.51f, "2099" });

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Available", "BestDeal", "Discounted", "OldPrice", "Percent", "Price" },
                values: new object[] { 1, 0, 1, "2699", 7.41f, "2499" });
        }
    }
}
