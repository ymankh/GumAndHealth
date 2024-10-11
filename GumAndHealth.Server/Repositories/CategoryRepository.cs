using GumAndHealth.Server.DTOs.CategoriesDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.shared;

namespace GumAndHealth.Server.Repositories
{
    public class CategoryRepository(MyDbContext context)
    {
        public List<Category> GetCategories()
        {
            return context.Categories.ToList();
        }

        public Category CreateCategory(CreateCategoryDto createCategoryDto)
        {
            var newCategory = new Category
            {
                Name = createCategoryDto.Name,
            };
            if (createCategoryDto.Image != null)
            {
                newCategory.Image = ImageSaver.SaveImage(createCategoryDto.Image);
            }
            context.Categories.Add(newCategory);
            context.SaveChanges();
            return newCategory;
        }
    }
}
