using GumAndHealth.Server.DTOs.ClassesDTOs;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class classCrudController : ControllerBase
    {
        private readonly MyDbContext _context;

        public classCrudController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/ClassCrudApps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassCrudApp>>> GetClasses()
        {
            return await _context.ClassServices
                .Select(c => new ClassCrudApp
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    ImagePath = c.ImagePath,
                    PricePerMonth = c.PricePerMonth
                })
                .ToListAsync();
        }

        // GET: api/ClassCrudApps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassCrudApp>> GetClass(long id)
        {
            var classEntity = await _context.ClassServices.FindAsync(id);

            if (classEntity == null)
            {
                return NotFound();
            }

            var dto = new ClassCrudApp
            {
                Id = classEntity.Id,
                Name = classEntity.Name,
                Description = classEntity.Description,
                ImagePath = classEntity.ImagePath,
                PricePerMonth = classEntity.PricePerMonth
            };

            return dto;
        }

        [HttpPost("postClassdashboard")]
        public async Task<IActionResult> CreateClass([FromBody] newClassDto newClass)
        {
            if (newClass?.ClassService == null)
            {
                return BadRequest("Invalid class data.");
            }

            // Create a new ClassService entity
            var classService = new ClassService
            {
                Name = newClass.ClassService.Name,
                Description = newClass.ClassService.Description,
                ImagePath = newClass.ClassService.ImagePath,
                PricePerMonth = newClass.ClassService.PricePerMonth,
                ClassSchedules = new List<ClassSchedule>() // Initialize the collection
            };

            // Add schedules from the DTO
            foreach (var scheduleDto in newClass.ClassService.ClassSchedules)
            {
                var classSchedule = new ClassSchedule
                {
                    AvailableDay = scheduleDto.AvailableDay,
                    StartTime = TimeOnly.FromTimeSpan(scheduleDto.StartTime),
                    EndTime = TimeOnly.FromTimeSpan(scheduleDto.EndTime),
                    ClassId = classService.Id, // Will be set after saving
                    InstructorId = scheduleDto.InstructorId
                };

                classService.ClassSchedules.Add(classSchedule);
            }

            // Add the new class service to the context
            _context.ClassServices.Add(classService);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Optionally return the created resource
            return CreatedAtAction(nameof(GetClassById), new { id = classService.Id }, classService);
        }

        // Example GET method for retrieving a class by ID
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetClassById(long id)
        //{
        //    var classService = await _context.ClassServices
        //        .Include(cs => cs.ClassSchedules)
        //        .FirstOrDefaultAsync(cs => cs.Id == id);

        //    if (classService == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(classService);
        //}


        [HttpPut("putClassdashboard")]
        public async Task<IActionResult> UpdateClass([FromBody] newClassDto updatedClass)
        {
            if (updatedClass?.ClassService == null)
            {
                return BadRequest("Invalid class data.");
            }

            var existingClass = await _context.ClassServices
                .Include(cs => cs.ClassSchedules)
                .FirstOrDefaultAsync(cs => cs.Id == updatedClass.ClassService.Id);

            if (existingClass == null)
            {
                return NotFound("Class not found.");
            }

            // Update properties of ClassService
            existingClass.Name = updatedClass.ClassService.Name;
            existingClass.Description = updatedClass.ClassService.Description;
            existingClass.ImagePath = updatedClass.ClassService.ImagePath;
            existingClass.PricePerMonth = updatedClass.ClassService.PricePerMonth;

            // Update existing schedules
            foreach (var schedule in existingClass.ClassSchedules)
            {
                var updatedSchedule = updatedClass.ClassService.ClassSchedules.FirstOrDefault(s => s.Id == schedule.Id);
                if (updatedSchedule != null)
                {
                    schedule.AvailableDay = updatedSchedule.AvailableDay;
                    schedule.StartTime = TimeOnly.FromTimeSpan(updatedSchedule.StartTime);
                    schedule.EndTime = TimeOnly.FromTimeSpan(updatedSchedule.EndTime);
                    schedule.InstructorId = updatedSchedule.InstructorId;
                }
            }

            // Add new schedules
            foreach (var newSchedule in updatedClass.ClassService.ClassSchedules.Where(s => s.Id == 0))
            {
                var classSchedule = new ClassSchedule
                {
                    AvailableDay = newSchedule.AvailableDay,
                    StartTime = TimeOnly.FromTimeSpan(newSchedule.StartTime),
                    EndTime = TimeOnly.FromTimeSpan(newSchedule.EndTime),
                    ClassId = existingClass.Id,
                    InstructorId = newSchedule.InstructorId
                };

                existingClass.ClassSchedules.Add(classSchedule);
            }

            // Remove schedules that are no longer present
            foreach (var schedule in existingClass.ClassSchedules
                     .Where(s => !updatedClass.ClassService.ClassSchedules.Any(us => us.Id == s.Id))
                     .ToList())
            {
                _context.ClassSchedules.Remove(schedule);
            }

            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content
        }








        // DELETE: api/ClassCrudApps/5
        [HttpDelete("deleteClass/{id}")]
        public async Task<IActionResult> DeleteClass(long id)
        {
            var classEntity = await _context.ClassServices.FindAsync(id);

            if (classEntity == null)
            {
                return NotFound();
            }

            _context.ClassServices.Remove(classEntity);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content
        }


        private bool ClassExists(long id)
        {
            return _context.ClassServices.Any(e => e.Id == id);
        }

        ////////////////////////////////////////////////
        ///

        [HttpGet("allClasses")]
        public async Task<ActionResult<IEnumerable<allClass>>> GetClassess()
        {
            var classes = await _context.ClassServices
                .Include(cs => cs.ClassSchedules)
                .ThenInclude(cs => cs.Instructor)
                .Select(cs => new allClass
                {
                    Id = cs.Id,
                    Name = cs.Name,
                    Description = cs.Description,
                    ImagePath = cs.ImagePath,
                    PricePerMonth = cs.PricePerMonth ?? 0,
                    AvailableDay = cs.ClassSchedules.Select(c => c.AvailableDay).FirstOrDefault(),
                    StartTime = cs.ClassSchedules.Select(c => c.StartTime).FirstOrDefault() ?? new TimeOnly(),
                    EndTime = cs.ClassSchedules.Select(c => c.EndTime).FirstOrDefault() ?? new TimeOnly(),
                    InstructorName = cs.ClassSchedules.Select(c => c.Instructor.FullName).FirstOrDefault()
                })
                .ToListAsync();

            return Ok(classes);
        }




        // New method to get a specific class by ID
        [HttpGet("getClass/{id}")]
        public async Task<ActionResult<allClass>> GetClassById(long id)
        {
            var classItem = await _context.ClassServices
                .Include(cs => cs.ClassSchedules)
                .ThenInclude(cs => cs.Instructor)
                .Where(cs => cs.Id == id)
                .Select(cs => new allClass
                {
                    Id = cs.Id,
                    Name = cs.Name,
                    Description = cs.Description,
                    ImagePath = cs.ImagePath,
                    PricePerMonth = cs.PricePerMonth ?? 0,
                    AvailableDay = cs.ClassSchedules.Select(c => c.AvailableDay).FirstOrDefault(),
                    StartTime = cs.ClassSchedules.Select(c => c.StartTime).FirstOrDefault() ?? new TimeOnly(),
                    EndTime = cs.ClassSchedules.Select(c => c.EndTime).FirstOrDefault() ?? new TimeOnly(),
                    InstructorName = cs.ClassSchedules.Select(c => c.Instructor.FullName).FirstOrDefault()
                })
                .FirstOrDefaultAsync();

            if (classItem == null)
            {
                return NotFound(); // Return 404 if class not found
            }

            return Ok(classItem);
        }
    }
}





    