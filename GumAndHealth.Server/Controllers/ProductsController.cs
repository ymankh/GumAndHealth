using GumAndHealth.Server.DTOs.ProductsDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsRepository _productRepository; // Inject the repository

        public ProductsController(ProductsRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // GET: api/Products
        [HttpGet]
        public IActionResult AllProducts([FromQuery] ProductFilterDto productFilter)
        {
            var paginatedProducts = _productRepository.GetPaginatedProduct(productFilter);
            return Ok(paginatedProducts);
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

        // POST: api/Products
        [HttpPost]
        public IActionResult CreateProduct([FromForm] CreateProductDto createProductDto)
        {
            var newProduct = _productRepository.CreateProduct(createProductDto);
            return Ok(newProduct);
        }

        // GET: api/Products/ByPriceRange
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
    }
}
