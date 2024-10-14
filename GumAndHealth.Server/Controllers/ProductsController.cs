using GumAndHealth.Server.DTOs.ProductsDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsRepository _productRepository;
        private readonly MyDbContext _context;

        // Inject both MyDbContext and ProductsRepository
        public ProductsController(ProductsRepository productRepository, MyDbContext context)
        {
            _productRepository = productRepository;
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public IActionResult AllProducts([FromQuery] ProductFilterDto productFilter)
        {
            var paginatedProducts = _productRepository.GetPaginatedProduct(productFilter);
            return Ok(paginatedProducts);
        }

        // GET: api/Products/{id}
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productRepository.GetProductById(id);

            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return Ok(product);
        }

        // GET: api/Products/AllProducts
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

        // GET: api/Products/AllCategories
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

        // POST: api/Products/AddProduct
        [HttpPost("AddProduct")]
        public IActionResult AddProduct([FromForm] CreateProductDto createProductDto)
        {
            string fileName = null;

            if (createProductDto.Image1 != null)
            {
                // Define where the image will be saved
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/products");

                // Ensure the folder exists
                if (!Directory.Exists(uploads))
                {
                    Directory.CreateDirectory(uploads);
                }

                // Generate a unique file name for the image
                fileName = Guid.NewGuid().ToString() + Path.GetExtension(createProductDto.Image1.FileName);
                var filePath = Path.Combine(uploads, fileName);

                // Save the image to the file system
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    createProductDto.Image1.CopyTo(stream);
                }
            }

            // Create the new product object
            var product = new Product
            {
                Name = createProductDto.Name,
                Description = createProductDto.Description,
                Price = createProductDto.Price,
                CategoryId = createProductDto.CategoryId,
                Image1 = fileName != null ? "/uploads/products/" + fileName : null
            };

            // Add the product to the database
            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok(product);
        }

        // PUT: api/Products/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromForm] UpdateProductDto updateProductDto)
        {
            var updatedProduct = _productRepository.UpdateProduct(id, updateProductDto);

            if (updatedProduct == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return Ok(updatedProduct);
        }

        // DELETE: api/Products/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var result = _productRepository.DeleteProduct(id);

            if (!result)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return Ok($"Product with ID {id} was successfully deleted.");
        }
        ////////////////////////////////////////////////
        ///


        // GET: api/Products/{id}
        [HttpGet("GetProductByIdNew/{id}")]
        public IActionResult GetProductByIdNew(int id)
        {
            var product = _context.Products
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.Image1,
                    p.CategoryId,
                    CategoryName = p.Category.Name  // إضافة اسم الـ Category
                })
                .FirstOrDefault();

            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return Ok(product);
        }


        // GET: api/Products/AllProducts

        [HttpGet("AllProductsNew")]
        public IActionResult GetAllProductsNew()
        {
            var products = _context.Products
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.Image1,
                    p.CategoryId,
                    CategoryName = p.Category.Name  // إضافة اسم الـ Category
                })
                .ToList();

            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }


        [HttpPut("UpdateProductNew/{id}")]
        public IActionResult UpdateProductNew(int id, [FromForm] UpdateProductDto updateProductDto)
        {
            var updatedProduct = _productRepository.UpdateProduct(id, updateProductDto);

            if (updatedProduct == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            // الحصول على اسم الـ Category بعد التحديث
            var category = _context.Categories.FirstOrDefault(c => c.Id == updatedProduct.CategoryId);
            var categoryName = category?.Name ?? "Category not found";

            return Ok(new
            {
                updatedProduct.Id,
                updatedProduct.Name,
                updatedProduct.Description,
                updatedProduct.Price,
                updatedProduct.Image1,
                updatedProduct.CategoryId,
                CategoryName = categoryName  // إضافة اسم الـ Category بعد التحديث
            });
        }

        [HttpGet("getImages/{ImageName}")]

        public IActionResult getImage(string ImageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "images", ImageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpeg");

            }
            return NotFound();


        }



    }
}
