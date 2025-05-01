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
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out int userId))
                {
                    return Unauthorized("User not authenticated or invalid user ID.");
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null) return NotFound("User not found.");

                var orders = await _context.Orders
                    .Where(o => o.UserId == userId)
                    .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Device)
                    .Select(o => new
                    {
                        o.Id,
                        o.OrderDate,
                        Devices = o.OrderItems.Select(oi => new
                        {
                            oi.Device.Id,
                            oi.Device.Name,
                            oi.Device.Price,
                            oi.Device.OldPrice,
                            oi.Device.Percent,
                            oi.Device.Image,
                            oi.Device.Type,
                            oi.Device.Offer,
                            oi.Device.Available,
                            oi.Device.BestDeal,
                            oi.Device.Discounted,
                            oi.Device.Specifications,
                            oi.Quantity,
                            oi.Variant,
                            OrderPrice = oi.Price
                        })
                    })
                    .ToListAsync();

                var favorites = await _context.Favorites
                    .Where(f => f.UserId == userId)
                    .Include(f => f.Device)
                    .Select(f => new
                    {
                        Device = new
                        {
                            f.Device.Id,
                            f.Device.Name,
                            f.Device.Price,
                            f.Device.OldPrice,
                            f.Device.Percent,
                            f.Device.Image,
                            f.Device.Type,
                            f.Device.Offer,
                            f.Device.Available,
                            f.Device.BestDeal,
                            f.Device.Discounted,
                            f.Device.Specifications
                        }
                    })
                    .ToListAsync();

                return Ok(new
                {
                    Message = "Welcome Gamer 🎮",
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Phone = user.Phone,
                    Orders = orders,
                    Favorites = favorites
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updateDto)
        {
            try
            {
                var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out int userId))
                    return Unauthorized("User not authenticated.");

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null) return NotFound("User not found.");

                bool updated = false;
                List<string> updatedFields = new();

                if (!string.IsNullOrWhiteSpace(updateDto.Email) && updateDto.Email != user.Email)
                {
                    user.Email = updateDto.Email.Trim();
                    updated = true;
                    updatedFields.Add("Email");
                }

                if (!string.IsNullOrWhiteSpace(updateDto.Phone) && updateDto.Phone != user.Phone)
                {
                    user.Phone = updateDto.Phone.Trim();
                    updated = true;
                    updatedFields.Add("Phone");
                }

                if (!string.IsNullOrWhiteSpace(updateDto.NewPassword))
                {
                    if (string.IsNullOrWhiteSpace(updateDto.CurrentPassword))
                        return BadRequest("Current password is required to change your password.");

                    bool isCorrect = BCrypt.Net.BCrypt.Verify(updateDto.CurrentPassword, user.Password);
                    if (!isCorrect)
                        return BadRequest("Current password is incorrect.");

                    user.Password = BCrypt.Net.BCrypt.HashPassword(updateDto.NewPassword);
                    updated = true;
                    updatedFields.Add("Password");
                }

                if (!updated)
                    return BadRequest("No changes detected.");

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = $"Updated: {string.Join(", ", updatedFields)}.",
                    Email = user.Email,
                    Phone = user.Phone
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }
    }
}
