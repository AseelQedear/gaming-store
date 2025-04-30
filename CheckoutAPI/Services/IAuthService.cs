using CheckoutAPI.Models;
using CheckoutAPI.Models.Auth;

namespace CheckoutAPI.Services
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(RegisterRequest request);
        Task<string?> LoginAsync(LoginRequest request);
        Task<User?> GetUserByEmailAsync(string email);

        
    }
}
