using GumAndHealth.Server.Models;

namespace GumAndHealth.Server.Repositories
{
    public class CategoryRepository(MyDbContext context)
    {
        public List<Category> GetCategories()
        {
            return context.Categories.ToList();
        }
    }
}
