using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using CheckoutAPI.Data;
using CheckoutAPI.Models;


[Authorize]
[ApiController]
[Route("api/[controller]")]
public class FavoriteController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FavoriteController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddFavorite([FromBody] int deviceId)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        var exists = await _context.Favorites.AnyAsync(f => f.UserId == userId && f.DeviceId == deviceId);
        if (exists) return BadRequest("Already favorited.");

        var favorite = new Favorite { UserId = userId, DeviceId = deviceId };
        _context.Favorites.Add(favorite);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{deviceId}")]
    public async Task<IActionResult> RemoveFavorite(int deviceId)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        var fav = await _context.Favorites.FirstOrDefaultAsync(f => f.UserId == userId && f.DeviceId == deviceId);
        if (fav == null) return NotFound();

        _context.Favorites.Remove(fav);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet]
public async Task<IActionResult> GetFavorites()
{
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

    var favorites = await _context.Favorites
    .Where(f => f.UserId == userId)
    .Include(f => f.Device)
    .Select(f => new {
        Device = new {
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


    return Ok(favorites);
}

}
