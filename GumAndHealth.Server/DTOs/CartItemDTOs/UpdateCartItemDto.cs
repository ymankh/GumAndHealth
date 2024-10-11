namespace GumAndHealth.Server.DTOs.CartItemDTOs
{
    public class UpdateCartItemDto
    {
        public long ProductId { get; set; }
        public long UserId { get; set; }
        public long Quantity { get; set; } = 1;
    }
}
