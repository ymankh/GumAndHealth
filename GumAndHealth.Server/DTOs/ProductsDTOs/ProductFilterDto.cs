namespace GumAndHealth.Server.DTOs.ProductsDTOs
{
    public class ProductFilterDto
    {
        public string? Search { get; set; }
        public long? CategoryId { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public bool? HasDiscount { get; set; }
        public string? Tags { get; set; }
        public int Page { get; set; } = 1;
    }
}
