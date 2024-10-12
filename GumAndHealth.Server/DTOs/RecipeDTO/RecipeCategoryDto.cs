namespace GumAndHealth.Server.DTOs.RecipeDTO
{
    public class RecipeCategoryDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; } // هذا الحقل لرفع الملف
    }
}
