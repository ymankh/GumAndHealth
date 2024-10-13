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
        public class RecipeController : ControllerBase
        {
        private readonly MyDbContext _context;

        public RecipeController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
            public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
            {
                return await _context.Recipes.ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<Recipe>> GetRecipe(long id)
            {
                var recipe = await _context.Recipes.FirstOrDefaultAsync(r => r.Id == id);

                if (recipe == null)
                {
                    return NotFound();
                }

                return recipe;
            }

        [HttpGet("GetRecipeByCategory")]
        public async Task<IActionResult> GetRecipeByCategory(long recipeCategoryId)
        {
            // استخدم FirstOrDefaultAsync لجلب الوصفة الأولى التي تتطابق مع الفئة
            var recipe = await _context.Recipes
                                       .FirstOrDefaultAsync(r => r.RecipeCategoryId == recipeCategoryId);

            // تأكد من أن الوصفة موجودة قبل إعادة النتيجة
            if (recipe == null)
            {
                return NotFound("No recipe found for this category.");
            }

            return Ok(recipe);
        }

        // إضافة وصفة جديدة
        [HttpPost]
        [Route("AddRecipe")]
        public async Task<IActionResult> AddRecipe([FromForm] RecipeDto recipeDto)
        {
            if (recipeDto.Image != null)
            {
                // اسم الملف
                var fileName = Path.GetFileName(recipeDto.Image.FileName);

                // مسار حفظ الصورة
                var basePath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                var filePath = Path.Combine(basePath, fileName);

                // تأكد من أن المجلد موجود
                if (!Directory.Exists(basePath))
                {
                    Directory.CreateDirectory(basePath);
                }

                // حفظ الصورة في المسار المحدد
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await recipeDto.Image.CopyToAsync(stream);
                }

                // إضافة الوصفة إلى قاعدة البيانات
                var newRecipe = new Recipe
                {
                    Name = recipeDto.Name,
                    Description = recipeDto.Description,
                    RecipeCategoryId = recipeDto.RecipeCategoryId,
                    CaloriesCount = recipeDto.CaloriesCount,
                    Ingredients = recipeDto.Ingredients,
                    Recipe1 = recipeDto.Recipe1,
                    Image = fileName // حفظ اسم الصورة فقط (المسار النسبي)
                };

                _context.Recipes.Add(newRecipe);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Recipe added successfully" });
            }

            return BadRequest(new { success = false, message = "Image is required" });
        }

    }

}

