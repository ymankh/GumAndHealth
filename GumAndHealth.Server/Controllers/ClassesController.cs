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

            var classDetails = _db.ClassServices
                .Include(cs => cs.ClassSchedules) // جلب مواعيد الكلاس
                .ThenInclude(cs => cs.Instructor)  // جلب معلومات المدرب
                .FirstOrDefault(cs => cs.Id == id);

            if (classDetails == null) { return NotFound("Class not found"); }

            var response = new
            {
                ClassId = classDetails.Id,
                ClassName = classDetails.Name,
                ClassImage = classDetails.ImagePath,
                Description = classDetails.Description,
                Schedules = classDetails.ClassSchedules.Select(cs => new
                {
                    ClassScheduleId = cs.Id,
                    AvailableDay = cs.AvailableDay,
                    StartTime = cs.StartTime,
                    EndTime = cs.EndTime,
                    InstructorName = cs.Instructor.FullName,
                    InstructorBio = cs.Instructor.Bio,
                    InstructorCredentials = cs.Instructor.Credentials
                })
            };

            return Ok(response);
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
        [HttpGet("getAllClassSchedules")]
        public IActionResult GetAllClassSchedules()
        {
            var classSchedules = _db.ClassSchedules
                .Include(cs => cs.Instructor)  // جلب معلومات المدرس
                .Include(cs => cs.Class)        // جلب معلومات الكلاس
                .ToList();  // جلب جميع المواعيد

            if (!classSchedules.Any())
            {
                return NotFound("No class schedules found.");
            }

            var response = classSchedules.Select(cs => new
            {
                ClassScheduleId = cs.Id,
                AvailableDay = cs.AvailableDay,
                StartTime = cs.StartTime,
                EndTime = cs.EndTime,
                InstructorName = cs.Instructor.FullName,
                InstructorBio = cs.Instructor.Bio,
                InstructorCredentials = cs.Instructor.Credentials,
                ClassName = cs.Class.Name  // إضافة اسم الكلاس هنا
            });

            return Ok(response);
        }

        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "images", imageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();

        }

    }
}
