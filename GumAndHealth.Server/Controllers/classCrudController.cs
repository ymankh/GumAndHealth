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

        // POST: api/ClassCrudApps
        [HttpPost]
        public async Task<ActionResult<ClassCrudApp>> PostClass(ClassCrudApp classDto)
        {
            var classEntity = new ClassService
            {
                Name = classDto.Name,
                Description = classDto.Description,
                ImagePath = classDto.ImagePath,
                PricePerMonth = classDto.PricePerMonth
            };

            _context.ClassServices.Add(classEntity);
            await _context.SaveChangesAsync();

            classDto.Id = classEntity.Id;

            return CreatedAtAction(nameof(GetClass), new { id = classDto.Id }, classDto);
        }

        // PUT: api/ClassCrudApps/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClass(long id, ClassCrudApp classDto)
        {
            if (id != classDto.Id)
            {
                return BadRequest();
            }

            var classEntity = await _context.ClassServices.FindAsync(id);

            if (classEntity == null)
            {
                return NotFound();
            }

            classEntity.Name = classDto.Name;
            classEntity.Description = classDto.Description;
            classEntity.ImagePath = classDto.ImagePath;
            classEntity.PricePerMonth = classDto.PricePerMonth;

            _context.Entry(classEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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






        /// <summary>
        /// ///////////
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedClass"></param>
        /// <returns></returns>
        // New method to update a class
        [HttpPut("putClass/{id}")]
        public async Task<IActionResult> UpdateClass(long id, [FromBody] allClass updatedClass)
        {
            if (id != updatedClass.Id)
            {
                return BadRequest("Class ID mismatch.");
            }

            var existingClass = await _context.ClassServices
                .Include(cs => cs.ClassSchedules)
                .FirstOrDefaultAsync(cs => cs.Id == id);

            if (existingClass == null)
            {
                return NotFound("Class not found.");
            }

            // Update properties
            existingClass.Name = updatedClass.Name;
            existingClass.Description = updatedClass.Description;
            existingClass.ImagePath = updatedClass.ImagePath;
            existingClass.PricePerMonth = updatedClass.PricePerMonth;

            // Update schedules if necessary (you may want to handle this separately)
            // Assuming there's only one schedule for simplicity:
            var schedule = existingClass.ClassSchedules.FirstOrDefault();
            if (schedule != null)
            {
                schedule.AvailableDay = updatedClass.AvailableDay;
                schedule.StartTime = updatedClass.StartTime;
                schedule.EndTime = updatedClass.EndTime;
            }

            // Save changes
            await _context.SaveChangesAsync();
            return NoContent(); // 204 No Content
        }
    }   
}












