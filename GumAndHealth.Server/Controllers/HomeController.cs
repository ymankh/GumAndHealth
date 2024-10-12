using GumAndHealth.Server.DTOs.GymDTOs;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
