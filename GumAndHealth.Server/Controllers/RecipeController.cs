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
        [HttpPut]
        [Route("api/Recipe/{id}")]
        public async Task<IActionResult> UpdateRecipe(long id, [FromForm] RecipeDto recipeDto)
        {
            try
            {
                // البحث عن الوصفة الموجودة بناءً على المعرّف
                var recipe = await _context.Recipes.FindAsync(id);
                if (recipe == null)
                {
                    return NotFound(new { success = false, message = "Recipe not found" });
                }

                // التحقق من وجود صورة جديدة
                if (recipeDto.Image != null)
                {
                    // الحصول على المسار الكامل من المجلد الحالي
                    var baseImagePath = Path.Combine(Directory.GetCurrentDirectory(), "images");

                    // التأكد من أن الدليل موجود
                    if (!Directory.Exists(baseImagePath))
                    {
                        Directory.CreateDirectory(baseImagePath);
                    }

                    // إنشاء المسار الكامل للملف
                    var fileName = Path.GetFileName(recipeDto.Image.FileName);
                    var filePath = Path.Combine(baseImagePath, fileName);

                    // حفظ الصورة الجديدة في المسار المحدد
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await recipeDto.Image.CopyToAsync(stream);
                    }

                    // تحديث مسار الصورة فقط في حال تم تحميل صورة جديدة
                    recipe.Image = fileName; // تخزين فقط اسم الصورة وليس المسار الكامل
                }
                else
                {
                    recipe.Image = recipe.Image;
                }

                // تحديث البيانات الأخرى
                recipe.Name = recipeDto.Name;
                recipe.Description = recipeDto.Description;
                recipe.RecipeCategoryId = recipeDto.RecipeCategoryId;
                recipe.CaloriesCount = recipeDto.CaloriesCount;
                recipe.Ingredients = recipeDto.Ingredients;
                recipe.Recipe1 = recipeDto.Recipe1;

                // حفظ التغييرات في قاعدة البيانات
                _context.Recipes.Update(recipe);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Recipe updated successfully" });
            }
            catch (Exception ex)
            {
                // تسجيل الخطأ بشكل أكثر تفصيلاً
                var errorMessage = $"Error updating recipe: {ex.Message}. StackTrace: {ex.StackTrace}";
                Console.WriteLine(errorMessage);

                return StatusCode(500, new { success = false, message = errorMessage });
            }
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

