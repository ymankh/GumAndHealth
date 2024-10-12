namespace GumAndHealth.Server.DTOs.RaniaDTOs
{
    public class CategoryDTO
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }  // Ensure Image is of type IFormFile for file handling
    }
}
