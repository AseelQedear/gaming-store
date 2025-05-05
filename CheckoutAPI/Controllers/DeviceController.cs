using CheckoutAPI.Data;
using CheckoutAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CheckoutAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DeviceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Helper method to map offer strings to translation keys
        private string GetOfferKey(string offer)
        {
            return offer switch
            {
                "Free shipping + 200 games" => "steam_deck_offer",
                "Exclusive colorway + travel case" => "steam_deck_limited_offer",
                "Free shipping + Meta+ subscription" => "rog_ally_meta_offer",
                "Budget-friendly bundle with charger" => "rog_ally_budget_offer",
                "3 Months Xbox Game Pass + 200 Games" => "legion_go_offer",
                "Get Asgard’s Wrath 2 with purchase" => "msi_claw_wrath_offer",
                "Includes exclusive MSI travel pouch" => "msi_claw_pouch_offer",
                _ => "default"
            };
        }

        // Get all devices with specifications
        [HttpGet]
        public async Task<IActionResult> GetDevices()
        {
            var devices = await _context.Devices.AsNoTracking().ToListAsync();

            var result = devices.Select(device => new
            {
                device.Id,
                device.Name,
                device.Price,
                device.OldPrice,
                device.Percent,
                device.Image,
                device.Type,
                device.Offer,
                OfferKey = GetOfferKey(device.Offer),
                device.Available,
                device.BestDeal,
                device.Discounted,
                Specifications = JsonConvert.DeserializeObject<List<string>>(device.Specifications)
            });

            return Ok(result);
        }

        // Get device by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeviceById(int id)
        {
            var device = await _context.Devices.FirstOrDefaultAsync(d => d.Id == id);

            if (device == null)
                return NotFound("Product not found.");

            var specs = JsonConvert.DeserializeObject<List<string>>(device.Specifications);

            return Ok(new
            {
                device.Id,
                device.Name,
                device.Price,
                device.OldPrice,
                device.Percent,
                device.Image,
                device.Type,
                device.Offer,
                OfferKey = GetOfferKey(device.Offer),
                device.Available,
                device.BestDeal,
                device.Discounted,
                Specifications = specs
            });
        }

        // Get device by name
        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetDeviceByName(string name)
        {
            var device = await _context.Devices.FirstOrDefaultAsync(d => d.Name == name);

            if (device == null)
                return NotFound("Product not found.");

            var specs = JsonConvert.DeserializeObject<List<string>>(device.Specifications);

            return Ok(new
            {
                device.Id,
                device.Name,
                device.Price,
                device.OldPrice,
                device.Percent,
                device.Image,
                device.Type,
                device.Offer,
                OfferKey = GetOfferKey(device.Offer),
                device.Available,
                device.BestDeal,
                device.Discounted,
                Specifications = specs
            });
        }
    }
}
