using GumAndHealth.Server.DTOs.ClassesDTOs;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class allClassesController : ControllerBase
    {

        private readonly MyDbContext _db;
        public allClassesController(MyDbContext db) { 
        
            _db = db;
        }

        [HttpGet("GetAllClasses1")]
        public IActionResult GetAllClassesSub()
        {
            var classes = _db.ClassServices.ToList();
            if (classes == null) { return NotFound("There is no classes"); }
            return Ok(classes);
        }

        [HttpGet("GetClassesByID")]
        public IActionResult GetClassesByID(int id)
        {
            if (id <= 0) { return BadRequest("Please enter an Id higher than 0"); }

            var classDetails = _db.ClassServices.FirstOrDefault(cs => cs.Id == id);

            if (classDetails == null) { return NotFound("Class not found"); }

            var response = new
            {
                ClassId = classDetails.Id,
                ClassName = classDetails.Name,
                ClassPrice = classDetails.PricePerMonth,
                ClassImage = classDetails.ImagePath,
                Description = classDetails.Description,

            };

            return Ok(response);
        }

        [HttpPost("AddNewClassService")]
        public IActionResult AddNewClassService([FromForm] AddClassServiceDTO addClassServiceDTO)
        {
            var newClass = new ClassService
            {
                Name = addClassServiceDTO.Name,
                Description = addClassServiceDTO.Description,
                ImagePath = addClassServiceDTO.ImagePath,
                PricePerMonth = addClassServiceDTO.PricePerMonth
            };
            _db.ClassServices.Add(newClass);
            _db.SaveChanges();
            return Ok(newClass);
        }

        [HttpPut("UpdateClassService/{id}")]
        public IActionResult UpdateClassService(int id, [FromForm] AddClassServiceDTO addClassServiceDTO)
        {
            if (id <= 0) { return BadRequest("Please enter an Id higher than 0"); }

            var classToUpdate = _db.ClassServices.FirstOrDefault(cs => cs.Id == id);

            if (classToUpdate == null) { return NotFound("Class not found"); }

            classToUpdate.Name = addClassServiceDTO.Name;
            classToUpdate.Description = addClassServiceDTO.Description;
            classToUpdate.ImagePath = addClassServiceDTO.ImagePath;
            classToUpdate.PricePerMonth = addClassServiceDTO.PricePerMonth;

            _db.ClassServices.Update(classToUpdate);
            _db.SaveChanges();

            return Ok(classToUpdate);
        }


        [HttpDelete("DeleteClassService/{id}")]
        public IActionResult DeleteClassService(int id)
        {
            if (id <= 0) { return BadRequest("Please enter an Id higher than 0"); }

            var classToDelete = _db.ClassServices.FirstOrDefault(cs => cs.Id == id);

            if (classToDelete == null) { return NotFound("Class not found"); }

            _db.ClassServices.Remove(classToDelete);
            _db.SaveChanges();

            return Ok("Class deleted successfully");
        }
    }
}
