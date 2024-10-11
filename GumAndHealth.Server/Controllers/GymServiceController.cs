using GumAndHealth.Server.DTOs.GymServiceDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymServiceController(GymServiceRepository gymServiceRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(gymServiceRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Create(GymServiceCreateDto newGemService)
        {
            var gemService = gymServiceRepository.Create(newGemService);
            return Ok(gemService);
        }
    }
}
