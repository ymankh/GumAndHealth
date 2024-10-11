using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ClassesController(MyDbContext db)
        {
            _db = db;
        }
        ///////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("GetAllClasses")]
        public IActionResult GetAllClasses()
        {
            var classes = _db.ClassServices.ToList();
            if (classes == null) { return NotFound("There is no classes"); }
            return Ok(classes);
        }

        ///////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("GetClassByID")]
        public IActionResult GetClassByID(int id)
        {
            if (id <= 0) { return BadRequest("Please enter an Id higher than 0"); }
            var classes = _db.ClassServices.Where(x => x.Id == id).FirstOrDefault();
            if (classes == null) { return NotFound("There is no classes"); }
            return Ok(classes);
        }
        ///////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("filter")]
        public async Task<IActionResult> FilterClasses(string? Name)
        {
            var query = _db.ClassServices.AsQueryable();

            if (!string.IsNullOrEmpty(Name))
                query = query.Where(c => c.Name.Contains(Name));
            var filteredCards = await query.ToListAsync();
            return Ok(filteredCards);
        }

        ///////////////////////////////////////////////////////////////////////////////////////
        [HttpGet("getInstructorByclassID")]
        public IActionResult getInstructorByclassID(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Please enter an Id higher than 0");
            }

            var classSchedule = _db.ClassSchedules
                .Include(cs => cs.Instructor)
                .FirstOrDefault(cs => cs.Id == id);


            if (classSchedule == null)
            {
                return NotFound("Class schedule not found");
            }

            var response = new
            {
                ClassScheduleId = classSchedule.Id,
                availableDay = classSchedule.AvailableDay,
                startTime = classSchedule.StartTime,
                endTime = classSchedule.EndTime,
                instructorName = classSchedule.Instructor.FullName,
                instructorBio = classSchedule.Instructor.Bio,
                instructorCredentials = classSchedule.Instructor.Credentials
            };

            return Ok(response);
        }

        ///////////////////////////////////////////////////////////////////////////////////////




    }
}
