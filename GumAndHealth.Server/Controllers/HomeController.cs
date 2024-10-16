using GumAndHealth.Server.DTOs.GymDTOs;
using GumAndHealth.Server.DTOs.ProductsDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly MyDbContext _db;

        public HomeController(MyDbContext db)
        {
            _db = db;
        }
        // البحث في الجداول الثلاثة
        [HttpGet("search")]
        public IActionResult Search(string query)
        {
            // البحث في جدول classService
            var classServiceResults = _db.ClassServices
                .Where(c => c.Name.Contains(query) || c.Description.Contains(query))

                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description,
                    c.ImagePath,
                    c.PricePerMonth
                }).ToList();

            // البحث في جدول gymService
            var gymServiceResults = _db.GymServices
                .Where(g => g.Name.Contains(query) || g.Description.Contains(query))
                .Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.Description,
                    g.ImagePath,
                    g.PricePerMonth,
                    g.WomenShiftStart,
                    g.WomenShiftEnd,
                    g.MenShiftStart,
                    g.MenShiftEnd,
                    g.IsMixed
                }).ToList();

            // البحث في جدول product
            var productResults = _db.Products
                .Where(p => p.Name.Contains(query) || p.Description.Contains(query))
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.Discount,
                    p.Tags,
                    p.Image1,
                    p.Image2,
                    p.Image3,
                    p.Image4,
                    p.Image5,
                    p.Image6,
                    p.Image7,
                    p.Description,
                    p.AdditionalInformation
                }).ToList();

            // البحث في جدول recipes
            var recipeResults = _db.Recipes
                .Where(r => r.Name.Contains(query) || r.Description.Contains(query))
                .Select(r => new
                {
                    r.Id,
                    r.Name,
                    r.Image,
                    r.Description,
                    r.RecipeCategoryId,
                    r.CaloriesCount,
                    r.Ingredients,
                    r.Recipe1
                }).ToList();

            // دمج النتائج
            var result = new
            {
                ClassServices = classServiceResults,
                GymServices = gymServiceResults,
                Products = productResults,
                Recipes = recipeResults // إضافة نتائج الوصفات
            };

            return Ok(result);
        }

        [HttpGet]
        public IActionResult AllProducts()
        {
            var paginatedProducts = _db.Products
                .Take(3) // جلب 3 منتجات فقط
                .ToList();

            return Ok(paginatedProducts);
        }

        [HttpGet("GetAllGyms")]
        public IActionResult GetAllGyms()
        {
            // جلب 3 Gyms بشكل عشوائي
            var randomGyms = _db.GymServices
                .OrderBy(g => Guid.NewGuid()) // ترتيب عشوائي
                .Select(g => new GymResponseDTO
                {
                    Id = g.Id,
                    Name = g.Name,
                    Description = g.Description,
                    ImagePath = g.ImagePath,
                    PricePerMonth = g.PricePerMonth,
                    WomenShiftEnd = g.WomenShiftEnd,
                    WomenShiftStart = g.WomenShiftStart,
                    MenShiftEnd = g.MenShiftEnd,
                    MenShiftStart = g.MenShiftStart,
                    IsMixed = g.IsMixed
                })
                .Take(3) // جلب أول 3 Gyms بعد الترتيب العشوائي
                .ToList();

            if (!randomGyms.Any())
            {
                return NotFound("No Gyms Found");
            }

            return Ok(randomGyms);
        }

    }
}
