namespace GumAndHealth.Server.DTOs.RecipeDTO
{
    public class RecipeDto
    {
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }  // استلام الصورة من العميل
        public string? Description { get; set; }
        public long? RecipeCategoryId { get; set; }
        public long? CaloriesCount { get; set; }
        public string? Ingredients { get; set; }
        public string? Recipe1 { get; set; }
    }
}
