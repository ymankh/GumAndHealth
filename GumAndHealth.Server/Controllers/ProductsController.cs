using GumAndHealth.Server.DTOs.ProductsDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GumAndHealth.Server.Controllers
{
    // Change route for AllProducts to avoid conflicts with the default GET route.
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsRepository _productRepository;

        public ProductsController(ProductsRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // Default GET for paginated products (if pagination is required)
        [HttpGet]
        public IActionResult AllProducts([FromQuery] ProductFilterDto productFilter)
        {
            var paginatedProducts = _productRepository.GetPaginatedProduct(productFilter);
            return Ok(paginatedProducts);
        }

        // GET: api/Products/AllProducts to fetch ALL products
        [HttpGet("AllProducts")]
        public IActionResult GetAllProducts()
        {
            var products = _productRepository.GetAllProducts();
            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }

        // GET: api/Products/AllCategories to fetch ALL categories
        [HttpGet("AllCategories")]
        public IActionResult GetAllCategories()
        {
            var categories = _productRepository.GetAllCategories();
            if (categories == null || !categories.Any())
            {
                return NotFound("No categories found.");
            }

            return Ok(categories);
        }

        // GET: api/Products/category/{categoryId}
        [HttpGet("category/{categoryId}")]
        public IActionResult GetProductsByCategory(int categoryId)
        {
            if (categoryId <= 0)
            {
                return BadRequest("Invalid category ID.");
            }

            var products = _productRepository.GetProductsByCategoryId(categoryId);
            if (products == null || !products.Any())
            {
                return NotFound($"No products found for category ID {categoryId}.");
            }

            return Ok(products);
        }


        [HttpGet("ByPriceRange")]
        public IActionResult GetProductsByPriceRange([FromQuery] decimal minPrice, [FromQuery] decimal maxPrice)
        {
            if (minPrice < 0 || maxPrice < minPrice)
            {
                return BadRequest("Invalid price range.");
            }

            var products = _productRepository.GetProductsByPriceRange(minPrice, maxPrice);
            if (products == null || !products.Any())
            {
                return NotFound("No products found within the specified price range.");
            }

            return Ok(products);
        }


        [HttpPost]
        public IActionResult CreateProduct([FromForm] CreateProductDto createProductDto)
        {
            var newProduct = _productRepository.CreateProduct(createProductDto);
            return Ok(newProduct);
        }



        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromForm] UpdateProductDto updateProductDto)
        {
            // Find the product by ID in the repository
            var updatedProduct = _productRepository.UpdateProduct(id, updateProductDto);

            if (updatedProduct == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return Ok(updatedProduct);
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            // Call the repository method to delete the product
            var result = _productRepository.DeleteProduct(id);

            if (!result)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return Ok($"Product with ID {id} was successfully deleted.");
        }

        // Additional methods...
    }

}