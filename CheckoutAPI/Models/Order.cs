using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheckoutAPI.Models
{
   public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public int UserId { get; set; }
    public string Email { get; set; } = string.Empty;

    public User User { get; set; } = null!;
    public List<OrderItem> OrderItems { get; set; } = new();

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Total { get; set; }  
    public string ShippingMethod { get; set; } = string.Empty; 
}

}
