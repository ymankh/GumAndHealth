using GumAndHealth.Server.DTOs.InstructorDTO;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // تأكد من أنك تستخدم EF Core

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        private readonly MyDbContext _context;

        public InstructorController(MyDbContext context)
        {
            _context = context;
        }

        // جلب جميع المدربين
        [HttpGet]
        public IActionResult GetInstructors()
        {
            var instructors = _context.Instructors.ToList();
            return Ok(instructors);
        }

        [HttpPost]
        public IActionResult AddInstructor([FromForm] InstructorDto instructorDto)
        {
            if (instructorDto == null)
                return BadRequest("بيانات المدرب فارغة.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var instructor = new Instructor
            {
                FullName = instructorDto.FullName,
                Bio = instructorDto.Bio,
                Credentials = instructorDto.Credentials
            };

            _context.Instructors.Add(instructor);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetInstructors), new { id = instructor.Id }, instructor);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateInstructor(int id, [FromForm] InstructorDto updatedInstructorDto)
        {
            var instructor = _context.Instructors.FirstOrDefault(i => i.Id == id);

            if (instructor == null)
                return NotFound($"Instructor with Id {id} not found.");

        
            instructor.FullName = updatedInstructorDto.FullName;
            instructor.Bio = updatedInstructorDto.Bio;
            instructor.Credentials = updatedInstructorDto.Credentials;

           
            _context.SaveChanges();

            return Ok("Instructor updated successfully.");
        }


   
        [HttpDelete("{id}")]
        public IActionResult DeleteInstructor(int id)
        {       var instructor = _context.Instructors.FirstOrDefault(i => i.Id == id);

     
            if (instructor == null)
                return NotFound($"Instructor with Id {id} not found.");

    
            _context.Instructors.Remove(instructor);
            _context.SaveChanges();

            return Ok("Instructor deleted successfully.");
        }

    }
}
