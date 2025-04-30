using System.ComponentModel.DataAnnotations.Schema;

namespace CheckoutAPI.Models
{
    public class Favorite
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public int DeviceId { get; set; }

        [ForeignKey("DeviceId")]
        public Device Device { get; set; }
    }
}
