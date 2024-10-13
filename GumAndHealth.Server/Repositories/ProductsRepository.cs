using GumAndHealth.Server.DTOs.ProductsDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.shared;
using System.Collections.Generic;
using System.Linq;

namespace GumAndHealth.Server.Repositories
{
    public class ProductsRepository
    {
        private readonly MyDbContext _context;  // Define _context properly

        public ProductsRepository(MyDbContext context)
        {
            _context = context;  // Initialize _context
        }

        public PagedResultDto GetPaginatedProduct(ProductFilterDto productFilter)
        {
            const int pageSize = 20;

            // Query the products
            var products = _context.Products.AsQueryable();

            // Filter by search
            if (!string.IsNullOrEmpty(productFilter.Search))
            {
                products = products.Where(p => p.Name.Contains(productFilter.Search));
            }

            // Filter by category
            if (productFilter.CategoryId.HasValue)
            {
                products = products.Where(p => p.CategoryId == productFilter.CategoryId.Value);
            }

            // Filter by price range
            if (productFilter.MinPrice.HasValue)
            {
                products = products.Where(p => p.Price >= productFilter.MinPrice.Value);
            }

            if (productFilter.MaxPrice.HasValue)
            {
                products = products.Where(p => p.Price <= productFilter.MaxPrice.Value);
            }

            // Filter by discount availability
            if (productFilter.HasDiscount.HasValue && productFilter.HasDiscount.Value)
            {
                products = products.Where(p => p.Discount.HasValue && p.Discount > 0);
            }

            // Filter by tags
            if (!string.IsNullOrEmpty(productFilter.Tags))
            {
                products = products.Where(p => p.Tags.Contains(productFilter.Tags));
            }

            // Get the total count for pagination
            var totalProducts = products.Count();

            // Pagination
            var paginatedProducts = products
                .Skip((productFilter.Page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResultDto
            {
                TotalCount = totalProducts,
                TotalPages = (int)Math.Ceiling(totalProducts / (double)pageSize),
                CurrentPage = productFilter.Page,
                PageSize = pageSize,
                Products = paginatedProducts
            };
        }

        public List<Product> GetAllProducts()
        {
            return _context.Products.ToList();
        }

        public Product CreateProduct(CreateProductDto createProductDto)
        {
            var product = new Product
            {
                AdditionalInformation = createProductDto.AdditionalInformation,
                CategoryId = createProductDto.CategoryId,
                Discount = createProductDto.Discount,
                Description = createProductDto.Description,
                Name = createProductDto.Name,
                Price = createProductDto.Price,
                Tags = createProductDto.Tags,
            };

            if (createProductDto.Image1 != null)
                product.Image1 = ImageSaver.SaveImage(createProductDto.Image1);
            if (createProductDto.Image2 != null)
                product.Image2 = ImageSaver.SaveImage(createProductDto.Image2);
            if (createProductDto.Image3 != null)
                product.Image3 = ImageSaver.SaveImage(createProductDto.Image3);
            if (createProductDto.Image4 != null)
                product.Image4 = ImageSaver.SaveImage(createProductDto.Image4);
            if (createProductDto.Image5 != null)
                product.Image5 = ImageSaver.SaveImage(createProductDto.Image5);
            if (createProductDto.Image6 != null)
                product.Image6 = ImageSaver.SaveImage(createProductDto.Image6);

            _context.Products.Add(product);
            _context.SaveChanges();
            return product;
        }

        // Add the method to get products by category ID
        public IEnumerable<Product> GetProductsByCategoryId(int categoryId)
        {
            return _context.Products.Where(p => p.CategoryId == categoryId).ToList();
        }

        public List<Product> GetProductsByPriceRange(decimal minPrice, decimal maxPrice)
        {
            return _context.Products
                .Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                .ToList();
        }


        public List<Category> GetAllCategories()
        {
            return _context.Categories.ToList(); // Assuming you have a Categories table
        }
        public Product UpdateProduct(int id, UpdateProductDto updateProductDto)
        {
            // Find the product by ID
            var product = _context.Products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return null; // Product not found
            }

            // Update the fields that can be changed
            product.Name = updateProductDto.Name;
            product.Description = updateProductDto.Description;
            product.Price = updateProductDto.Price;

            // Check if a new image is uploaded
            if (updateProductDto.Image != null)
            {
                // Assuming you have a method to save images and return the file path
                product.Image1 = ImageSaver.SaveImage(updateProductDto.Image);
            }

            // Save changes to the database
            _context.SaveChanges();

            return product;
        }

        public bool DeleteProduct(int id)
        {
            // Find the product by ID
            var product = _context.Products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return false; // Product not found
            }

            // Remove the product from the database
            _context.Products.Remove(product);

            // Save changes to the database
            _context.SaveChanges();

            return true; // Successfully deleted
        }

    }
}
