namespace GumAndHealth.Server.DTOs.ProductsDTOs
{
    public class UpdateProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public IFormFile Image { get; set; }


        public long? CategoryId { get; set; }

    }
}
