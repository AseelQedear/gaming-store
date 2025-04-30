using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using CheckoutAPI.Data;
using CheckoutAPI.Models;

namespace CheckoutAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CheckoutController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitOrder([FromBody] CheckoutRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out int userId))
                return Unauthorized("Invalid user ID");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized("User not found");

            // Verify all DeviceIds exist
            var deviceIds = request.Items.Select(i => i.DeviceId).ToList();
            var validDeviceIds = await _context.Devices
                .Where(d => deviceIds.Contains(d.Id))
                .Select(d => d.Id)
                .ToListAsync();

            var missingIds = deviceIds.Except(validDeviceIds).ToList();
            if (missingIds.Any())
                return BadRequest($"Invalid DeviceIds: {string.Join(", ", missingIds)}");

            // Create Order
            var order = new Order
            {
                UserId = user.Id,
                Email = user.Email,
                Total = (decimal)request.Total,
                ShippingMethod = request.ShippingMethod,
                OrderItems = request.Items.Select(item => new OrderItem
                {
                    DeviceId = item.DeviceId,
                    Quantity = item.Quantity,
                    Price = (decimal)item.Price,
                    Variant = item.Variant
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Order placed", orderId = order.Id });
        }

        [Authorize]
        [HttpGet("user/orders")]
        public async Task<IActionResult> GetUserOrders()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out int userId))
                return Unauthorized("Invalid user ID");

            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Device)
                .ToListAsync();

            return Ok(orders);
        }
    }
}
