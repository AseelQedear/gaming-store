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

    // ✅ Same OfferKey logic as DeviceController
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
                    OfferKey = GetOfferKey(f.Device.Offer),
                    f.Device.Available,
                    f.Device.BestDeal,
                    f.Device.Discounted,
                    Specifications = f.Device.Specifications
                }
            })
            .ToListAsync();

        return Ok(favorites);
    }
}
