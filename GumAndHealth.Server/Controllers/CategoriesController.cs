using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.DTOs.RaniaDTOs;




namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CategoriesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categories = _context.Categories.Select(c => new
            {
                c.Id,
                c.Name,
                Image = $"{Request.Scheme}://{Request.Host}/" + c.Image,
                c.Products
            }).ToList();

            return Ok(categories);
        }










        // GET: api/Categories/{id}
        [HttpGet("{id}")] // 
        public IActionResult GetCategoryById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID must be greater than 0.");
            }

            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }











        // GET: api/Categories/name/{name}
        [HttpGet("name/{name}")]
        public IActionResult GetCategoryByName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name cannot be null or empty.");
            }

            var category = _context.Categories.FirstOrDefault(c => c.Name == name);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }





        // DELETE: api/Categories/{id}
        [HttpDelete("{id}")] // Constraint: id must be >= 5
        public IActionResult DeleteCategory(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID must be greater than 0.");
            }

            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }





        // POST: api/Categories
        [HttpPost]
        public IActionResult AddCategory([FromForm] CategoryDTO categoryDto)
        {
            string fileName = null;

            if (categoryDto.Image != null)
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/images");
                if (!Directory.Exists(uploads))
                {
                    Directory.CreateDirectory(uploads);
                }
                fileName = Guid.NewGuid().ToString() + Path.GetExtension(categoryDto.Image.FileName);
                var filePath = Path.Combine(uploads, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    categoryDto.Image.CopyTo(stream);
                }
            }

            var category = new Category
            {
                
                Name = categoryDto.Name,
                Image = fileName != null ? "/uploads/images/" + fileName : null
            };

            _context.Categories.Add(category);
            _context.SaveChanges();

            return Ok(category);
        }

        // PUT: api/Categories/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromForm] CategoryDTO dto)
        {
            var category = _context.Categories.Find(id);
            if (category == null) return NotFound("Category not found.");

            category.Name = dto.Name;
            

            if (dto.Image != null)
            {
                // Delete old image if exists
                if (!string.IsNullOrWhiteSpace(category.Image))
                {
                    var oldFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", category.Image);
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                // Save new image
                var newFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
                var newFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", newFileName);
                using (var stream = new FileStream(newFilePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                category.Image = $"uploads/{newFileName}";
            }

            _context.SaveChanges();
            return Ok(category);
        }



        // GET: api/categories-with-product-count
        [HttpGet("categories-with-product-count")]
        public async Task<IActionResult> GetCategoriesWithProductCount()
        {
            var categories = await _context.Categories
                .Select(c => new
                {
                    CategoryId = c.Id,
                    Name = c.Name,
                    ProductCount = c.Products.Count() // Count the products in each category
                })
                .ToListAsync();

            return Ok(categories);
        }
    }
}