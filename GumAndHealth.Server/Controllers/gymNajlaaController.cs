using GumAndHealth.Server.DTOs.OrderDTO;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymNajlaaController : ControllerBase
    {
        private readonly MyDbContext _db;

        public GymNajlaaController(MyDbContext db)
        {
            _db = db;
        }

        // Get all gym services
        [HttpGet]
        public async Task<IActionResult> GetAllGymServices()
        {
            var gymServices = await _db.GymServices.ToListAsync();
            return Ok(gymServices);
        }

        // Get gym service by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGymServiceById(long id)
        {
            var gymService = await _db.GymServices.FindAsync(id);
            if (gymService == null)
                return NotFound(new { success = false, message = "Gym service not found" });

            return Ok(gymService);
        }

        // Add new gym service with image upload
        [HttpPost]
        public async Task<IActionResult> AddGymService([FromForm] GymServiceDto gymServiceDto)
        {
            if (gymServiceDto.Image != null)
            {
                var fileName = Path.GetFileName(gymServiceDto.Image.FileName);
                var basePath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                var filePath = Path.Combine(basePath, fileName);

                // Ensure the directory exists
                if (!Directory.Exists(basePath))
                {
                    Directory.CreateDirectory(basePath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await gymServiceDto.Image.CopyToAsync(stream);
                }

                var newGymService = new GymService
                {
                    Name = gymServiceDto.Name,
                    Description = gymServiceDto.Description,
                    PricePerMonth = gymServiceDto.PricePerMonth,
                    WomenShiftStart = gymServiceDto.WomenShiftStart,
                    WomenShiftEnd = gymServiceDto.WomenShiftEnd,
                    MenShiftStart = gymServiceDto.MenShiftStart,
                    MenShiftEnd = gymServiceDto.MenShiftEnd,
                    IsMixed = gymServiceDto.IsMixed,
                    ImagePath = fileName // Save only the image file name
                };

                _db.GymServices.Add(newGymService);
                await _db.SaveChangesAsync();

                return Ok(new { success = true, message = "Gym service added successfully" });
            }

            return BadRequest(new { success = false, message = "Image is required" });
        }

        // Update gym service
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGymService(long id, [FromForm] GymServiceDto gymServiceDto)
        {
            var existingGymService = await _db.GymServices.FindAsync(id);
            if (existingGymService == null)
                return NotFound(new { success = false, message = "Gym service not found" });

            if (gymServiceDto.Image != null)
            {
                var fileName = Path.GetFileName(gymServiceDto.Image.FileName);
                var basePath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                var filePath = Path.Combine(basePath, fileName);

                if (!Directory.Exists(basePath))
                {
                    Directory.CreateDirectory(basePath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await gymServiceDto.Image.CopyToAsync(stream);
                }

                existingGymService.ImagePath = fileName; // Update the image path if a new image is uploaded
            }

            existingGymService.Name = gymServiceDto.Name;
            existingGymService.Description = gymServiceDto.Description;
            existingGymService.PricePerMonth = gymServiceDto.PricePerMonth;
            existingGymService.WomenShiftStart = gymServiceDto.WomenShiftStart;
            existingGymService.WomenShiftEnd = gymServiceDto.WomenShiftEnd;
            existingGymService.MenShiftStart = gymServiceDto.MenShiftStart;
            existingGymService.MenShiftEnd = gymServiceDto.MenShiftEnd;
            existingGymService.IsMixed = gymServiceDto.IsMixed;

            await _db.SaveChangesAsync();
            return Ok(new { success = true, message = "Gym service updated successfully" });
        }

        // Delete gym service
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGymService(long id)
        {
            var gymService = await _db.GymServices.FindAsync(id);
            if (gymService == null)
                return NotFound(new { success = false, message = "Gym service not found" });

            _db.GymServices.Remove(gymService);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Gym service deleted successfully" });
        }
    }
}
