using System.Text.Json.Serialization;

namespace CheckoutAPI.Models
{
    public class DeviceSpec
    {
        public int Id { get; set; }
        public string Spec { get; set; } = string.Empty; // Initialize to empty string

        // Foreign key to the Device
        public int DeviceId { get; set; }

        // Navigation property for the related Device
        [JsonIgnore]  // Prevent circular reference during serialization
        public Device Device { get; set; }
    }
}
