using CheckoutAPI.Models.Auth;
using CheckoutAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CheckoutAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginRequest request)
{
    var token = await _authService.LoginAsync(request);
    if (token == null)
        return Unauthorized(new { error = "Invalid email or password." });

    var user = await _authService.GetUserByEmailAsync(request.Email);
    if (user == null)
        return Unauthorized(new { error = "User not found." });

    return Ok(new { token, email = user.Email });
}


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var token = await _authService.RegisterAsync(request);
            if (token == null)
                return Conflict(new { error = "Email already exists." });

            return Ok(new { token = token, email = request.Email });
        }
    }

    
}

