using GumAndHealth.Server.DTOs.RecipeDTO;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;


namespace GumAndHealth.Server.Controllers
{
   
        [Route("api/[controller]")]
        [ApiController]
        public class RecipeCategoryController : ControllerBase
        {
            private readonly MyDbContext _context;

            public RecipeCategoryController(MyDbContext context)
            {
                _context = context;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<RecipesCategory>>> GetRecipeCategories()
            {
                return await _context.RecipesCategories.ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<RecipesCategory>> GetRecipeCategory(long id)
            {
                var category = await _context.RecipesCategories
                                             .Include(c => c.Recipes)
                                             .FirstOrDefaultAsync(c => c.Id == id);

                if (category == null)
                {
                    return NotFound();
                }




                return category;
            }

        [HttpPost]
        [Route("api/RecipeCategory")]
        public async Task<IActionResult> AddRecipeCategory([FromForm] RecipeCategoryDto recipeCategoryDto)
        {
            if (recipeCategoryDto.Image != null)
            {
                var fileName = Path.GetFileName(recipeCategoryDto.Image.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "C://Users/Orange/source/repos/GumAndHealth/gumandhealth.client/src/assets/img", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await recipeCategoryDto.Image.CopyToAsync(stream);
                }

                // Save data to database
                var newCategory = new RecipesCategory
                {
                    Name = recipeCategoryDto.Name,
                    Description = recipeCategoryDto.Description,
                    ImagePath = fileName
                };

                _context.RecipesCategories.Add(newCategory);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Category added successfully" });
            }

            return BadRequest(new { success = false, message = "Image is required" });
        }


    }

}


