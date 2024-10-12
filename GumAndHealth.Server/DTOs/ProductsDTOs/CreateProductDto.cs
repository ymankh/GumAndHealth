namespace GumAndHealth.Server.DTOs.ProductsDTOs
{
    public class CreateProductDto
    {
        public long? CategoryId { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public decimal? Discount { get; set; }

        public string? Tags { get; set; }

        public IFormFile? Image1 { get; set; }

        public IFormFile? Image2 { get; set; }

        public IFormFile? Image3 { get; set; }

        public IFormFile? Image4 { get; set; }

        public IFormFile? Image5 { get; set; }

        public IFormFile? Image6 { get; set; }

        public IFormFile? Image7 { get; set; }

        public string? Description { get; set; }

        public string? AdditionalInformation { get; set; }
    }
}
