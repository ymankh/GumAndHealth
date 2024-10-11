using GumAndHealth.Server.DTOs.GymDTOs;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public GymsController(MyDbContext db)
        {
            _db = db;
        }


        /// Get All Gyms (To Display all gyms in the gyms page)///

        [HttpGet("GetAllGyms")]
        public IActionResult GetAllGyms()
        {
            var allGyms = _db.GymServices.Select(g => new GymResponseDTO
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

            }).ToList();

            if (!allGyms.Any())
            {

                return NotFound("No Gyms Found");

            }

            return Ok(allGyms);
        }


        [HttpGet("GetGymById/{id}")]
        public IActionResult GetGymById(int id)
        {
            var gym = _db.GymServices.FirstOrDefault(g => g.Id == id);

            if (gym == null)
            {
                return NotFound("Gym not found");
            }

            return Ok(gym);


        }





    }
}
