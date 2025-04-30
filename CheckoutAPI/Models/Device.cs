using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CheckoutAPI.Models
{
    public class Device
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal OldPrice { get; set; }
        public double Percent { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Offer { get; set; } = string.Empty;
        public bool Available { get; set; }
        public bool BestDeal { get; set; }
        public bool Discounted { get; set; }

        // Navigation property for related DeviceSpecs
         public string Specifications { get; set; } = string.Empty; 
    }
}
