using System.ComponentModel.DataAnnotations;

namespace CheckoutAPI.Models
{
    public class UpdateProfileDto
    {
        [Phone]
        [RegularExpression(@"^\d{10,15}$", ErrorMessage = "Phone number must be 10 to 15 digits")]
        public string? Phone { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        public string? CurrentPassword { get; set; }

        public string? NewPassword { get; set; }
    }
}
