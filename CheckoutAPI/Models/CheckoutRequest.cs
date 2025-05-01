using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CheckoutAPI.Models
{
    public class CheckoutRequest
    {
        [Required]
        public string ShippingMethod { get; set; } = string.Empty;

        [Required]
        public double Total { get; set; }

        [Required]
        public List<OrderItemDto> Items { get; set; } = new();
    }

    public class OrderItemDto
    {
        [Required]
        public int DeviceId { get; set; }

        public string Name { get; set; } = string.Empty;

        [Required]
        public int Quantity { get; set; }

        [Required]
        public double Price { get; set; }

        public string Variant { get; set; } = string.Empty;
    }
}
