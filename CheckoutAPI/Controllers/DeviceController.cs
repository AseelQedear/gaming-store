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

        // Get all devices with specifications (now from the Specifications field)
        [HttpGet]
        public async Task<IActionResult> GetDevices()
        {
            var devices = await _context.Devices
                .AsNoTracking() 
                .ToListAsync();

            return Ok(devices);
        }

        // Get device by ID with specifications (from the Specifications field)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeviceById(int id)
        {
            var device = await _context.Devices
                .FirstOrDefaultAsync(d => d.Id == id);

            if (device == null)
            {
                return NotFound("Product not found.");
            }

            // Deserialize the Specifications field into a list of strings
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
                device.Available,
                device.BestDeal,
                device.Discounted,
                Specifications = specs
            });
        }

        // Get device by name with specifications (from the Specifications field)
        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetDeviceByName(string name)
        {
            var device = await _context.Devices
                .FirstOrDefaultAsync(d => d.Name == name);

            if (device == null)
            {
                return NotFound("Product not found.");
            }

            // Deserialize the Specifications field into a list of strings
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
                device.Available,
                device.BestDeal,
                device.Discounted,
                Specifications = specs
            });
        }
    }
}
