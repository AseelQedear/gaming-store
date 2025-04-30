using Microsoft.EntityFrameworkCore;
using CheckoutAPI.Models;
using Newtonsoft.Json;


namespace CheckoutAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for Users, Devices, Orders, Favorites
        public DbSet<User> Users { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; } 
        
        // DbSet for DeviceSpec (Device Specifications)
        public DbSet<DeviceSpec> DeviceSpecs { get; set; }

        // Seeding data for Devices and DeviceSpecs
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data for Devices
            modelBuilder.Entity<Device>().HasData(
                new Device
        {
            Id = 1,
            Name = "Steam Deck OLED 512GB",
            Price = 2599,
            OldPrice = 2799,
            Percent = 7.15,
            Image = "/media/steamdeck.png",
            Type = "Steam Deck",
            Offer = "Free shipping + 200 games",
            Available = true,
            BestDeal = false,
            Discounted = true,
            Specifications = JsonConvert.SerializeObject(new string[] {
                "7.4” HDR OLED display, 1280x800 resolution, up to 90Hz",
                "AMD APU: Zen 2 4-core, RDNA 2 GPU with 8 CUs",
                "16GB LPDDR5 RAM (6400 MT/s)",
                "512GB NVMe SSD",
                "Wi-Fi 6E, Bluetooth 5.3",
                "50Whr battery, 3–12 hours of gameplay",
                "Dual ambient light sensors",
                "SteamOS 3.0"
            })
        },
        new Device
        {
            Id = 2,
            Name = "Steam Deck 1TB Limited Edition",
            Price = 2899,
            OldPrice = 3149,
            Percent = 7.95,
            Image = "/media/steamdeck.png",
            Type = "Steam Deck",
            Offer = "Exclusive colorway + travel case",
            Available = true,
            BestDeal = false,
            Discounted = true,
            Specifications = JsonConvert.SerializeObject(new string[] {
                "7.4” HDR OLED screen, etched anti-glare glass",
                "AMD APU: Zen 2 4-core, RDNA 2 GPU with 8 CUs",
                "16GB LPDDR5 RAM (6400 MT/s)",
                "1TB NVMe SSD",
                "Wi-Fi 6E, Bluetooth 5.3",
                "50Whr battery",
                "Custom startup movie and virtual theme",
                "SteamOS 3.0"
            })
        },
        new Device
        {
            Id = 3,
            Name = "ROG Ally 1TB Z1 Extreme",
            Price = 2399,
            OldPrice = 2799,
            Percent = 14.29,
            Image = "/media/rogallywhite.png",
            Type = "ROG Ally",
            Offer = "Free shipping + Meta+ subscription",
            Available = false,
            BestDeal = false,
            Discounted = false,
            Specifications = JsonConvert.SerializeObject(new string[] {
                "7” FHD 1080p IPS touchscreen, 120Hz refresh rate",
                "AMD Ryzen Z1 Extreme, 8-core/16-thread, 12 RDNA 3 CUs",
                "16GB LPDDR5 RAM (6400 MT/s)",
                "1TB PCIe 4.0 SSD",
                "Wi-Fi 6E, Bluetooth 5.2",
                "Windows 11 Home",
                "ROG Armoury Crate SE",
                "Support for XG Mobile eGPU"
            })
        },
        new Device
        {
            Id = 4,
            Name = "ROG Ally 512GB Z1 Non-Extreme",
            Price = 1999,
            OldPrice = 2199,
            Percent = 9.1,
            Image = "/media/rogallyblack.png",
            Type = "ROG Ally",
            Offer = "Budget-friendly bundle with charger",
            Available = false,
            BestDeal = false,
            Discounted = false,
            Specifications = JsonConvert.SerializeObject(new string[] {
                "7” FHD 1080p IPS touchscreen, 120Hz refresh rate",
                "AMD Ryzen Z1, 6-core/12-thread, 4 RDNA 3 CUs",
                "16GB LPDDR5 RAM (6400 MT/s)",
                "512GB PCIe 4.0 SSD",
                "Wi-Fi 6E, Bluetooth 5.2",
                "Windows 11 Home",
                "Adaptive Cooling System",
                "Support for XG Mobile"
            })
        },
        new Device
        {
            Id = 5,
            Name = "Legion Go 1TB",
            Price = 2599,
            OldPrice = 2899,
            Percent = 10.35,
            Image = "/media/lenovogo.png",
            Type = "Lenovo Go",
            Offer = "3 Months Xbox Game Pass + 200 Games",
            Available = true,
            BestDeal = false,
            Discounted = true,
            Specifications = JsonConvert.SerializeObject(new string[] {
                "8.8” WQXGA (2560 x 1600) IPS touchscreen, 144Hz",
                "AMD Ryzen Z1 Extreme, 8-core/16-thread, RDNA 3",
                "16GB LPDDR5X RAM (7500 MT/s)",
                "1TB PCIe 4.0 SSD",
                "Wi-Fi 6E, Bluetooth 5.2",
                "Windows 11 Home",
                "Detachable Hall Effect controllers",
                "49.2Whr battery with fast charge"
            })
        },
        new Device
        {
            Id = 6,
            Name = "MSI Claw 128GB",
            Price = 2099,
            OldPrice = 2399,
            Percent = 12.51,
            Image = "/media/msiclaw.png",
            Type = "MSI Claw",
            Offer = "Get Asgard’s Wrath 2 with purchase",
            Available = false,
            BestDeal = false,
            Discounted = false,
            Specifications = JsonConvert.SerializeObject(new string[] {
                "7” FHD (1920 x 1080) IPS touchscreen, 120Hz",
                "Intel Core Ultra 5 135H, Intel Arc GPU",
                "16GB LPDDR5 RAM",
                "128GB PCIe Gen 4 SSD",
                "Wi-Fi 7, Bluetooth 5.4",
                "Windows 11 Home",
                "53Whr battery, Cooler Boost",
                "Hall Effect triggers and sticks"
            })
        },
        new Device
        {
            Id = 7,
            Name = "MSI Claw 512GB",
            Price = 2499,
            OldPrice = 2699,
            Percent = 7.41,
            Image = "/media/msiclaw.png",
            Type = "MSI Claw",
            Offer = "Includes exclusive MSI travel pouch",
            Available = true,
            BestDeal = false,
            Discounted = true,
            Specifications = JsonConvert.SerializeObject(new string[] {
                "7” FHD (1920 x 1080) IPS touchscreen, 120Hz",
                "Intel Core Ultra 7 155H, Intel Arc GPU",
                "16GB LPDDR5 RAM",
                "512GB PCIe Gen 4 SSD",
                "Wi-Fi 7, Bluetooth 5.4",
                "Windows 11 Home",
                "53Whr battery, Cooler Boost HyperFlow",
                "Hall Effect triggers and sticks"
                 })
            }
        );
    }
}
}