using GumAndHealth.Server.Models;
using Microsoft.Build.Framework;

namespace GumAndHealth.Server.DTOs.CategoriesDTOs
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; }
        public IFormFile? Image { get; set; }
    }
}
