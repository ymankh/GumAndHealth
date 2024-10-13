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
                var basePath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                var filePath = Path.Combine(basePath, fileName);

                // تأكد من أن المجلد موجود
                if (!Directory.Exists(basePath))
                {
                    Directory.CreateDirectory(basePath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await recipeCategoryDto.Image.CopyToAsync(stream);
                }

                // حفظ البيانات في قاعدة البيانات
                var newCategory = new RecipesCategory
                {
                    Name = recipeCategoryDto.Name,
                    Description = recipeCategoryDto.Description,
                    ImagePath = fileName // تخزين فقط اسم الصورة
                };

                _context.RecipesCategories.Add(newCategory);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Category added successfully" });
            }

            return BadRequest(new { success = false, message = "Image is required" });
        }


        [HttpPut]
        [Route("api/RecipeCategory/{id}")]
        public async Task<IActionResult> UpdateRecipeCategory(long id, [FromForm] RecipeCategoryDto recipeCategoryDto)
        {
            try
            {
                // البحث عن الفئة الموجودة بناءً على المعرّف
                var category = await _context.RecipesCategories.FindAsync(id);
                if (category == null)
                {
                    return NotFound(new { success = false, message = "Category not found" });
                }

                // التحقق من وجود صورة جديدة
                if (recipeCategoryDto.Image != null)
                {
                    // الحصول على المسار الكامل من المجلد الحالي
                    var baseImagePath = Path.Combine(Directory.GetCurrentDirectory(), "images");

                    // التأكد من أن الدليل موجود
                    if (!Directory.Exists(baseImagePath))
                    {
                        Directory.CreateDirectory(baseImagePath);
                    }

                    // إنشاء المسار الكامل للملف
                    var fileName = Path.GetFileName(recipeCategoryDto.Image.FileName);
                    var filePath = Path.Combine(baseImagePath, fileName);

                    // حفظ الصورة الجديدة في المسار المحدد
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await recipeCategoryDto.Image.CopyToAsync(stream);
                    }

                    // تحديث مسار الصورة فقط في حال تم تحميل صورة جديدة
                    category.ImagePath = fileName; // تخزين فقط اسم الصورة وليس المسار الكامل
                }
                else
                {
                    category.ImagePath = category.ImagePath;
                }
                // تحديث البيانات الأخرى
                category.Name = recipeCategoryDto.Name;
                category.Description = recipeCategoryDto.Description;

                // حفظ التغييرات في قاعدة البيانات
                _context.RecipesCategories.Update(category);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Category updated successfully" });
            }
            catch (Exception ex)
            {
                // تسجيل الخطأ بشكل أكثر تفصيلاً
                var errorMessage = $"Error updating category: {ex.Message}. StackTrace: {ex.StackTrace}";
                Console.WriteLine(errorMessage);

                return StatusCode(500, new { success = false, message = errorMessage });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(long id)
        {
            var category = await _context.RecipesCategories.FindAsync(id);

            if (category == null)
            {
                return NotFound(new { success = false, message = "Category not found" });
            }

            // التحقق من وجود وصفات مرتبطة
            var relatedRecipes = await _context.Recipes
                .Where(r => r.RecipeCategoryId == id)
                .ToListAsync();

            if (relatedRecipes.Any())
            {
                return Conflict(new { success = false, message = "Cannot delete category as it has related recipes" });
            }

            _context.RecipesCategories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Category deleted successfully" });
        }
        [HttpGet("getImage/{imageName}")]
        public IActionResult getService(string imageName)
        {


            var pathimage = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);
            if (System.IO.File.Exists(pathimage))
            {
                return PhysicalFile(pathimage, "image/png");

            }
            else
            {
                return NotFound();
            }

        }


    }

}


