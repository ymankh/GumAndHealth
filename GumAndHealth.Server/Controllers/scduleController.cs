using GumAndHealth.Server.DTOs.AdminClassService;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class scduleController : ControllerBase
    {
        private readonly MyDbContext _db;

        public scduleController(MyDbContext db)
        {
            _db = db;   
        }

        [HttpPut("UpdateClassSchedule/{id}")]
        public IActionResult UpdateClassSchedule(long id, [FromBody] AddClassWithTimeDTO addClassWithTimeDTO)
        {
            if (id <= 0) { return BadRequest("Please enter an Id higher than 0"); }

            var scheduleToUpdate = _db.ClassSchedules.FirstOrDefault(cs => cs.Id == id);

            if (scheduleToUpdate == null) { return NotFound("Class schedule not found"); }

            scheduleToUpdate.ClassId = addClassWithTimeDTO.ClassId;
            scheduleToUpdate.AvailableDay = addClassWithTimeDTO.AvailableDay;
            scheduleToUpdate.StartTime = addClassWithTimeDTO.StartTime;
            scheduleToUpdate.EndTime = addClassWithTimeDTO.EndTime;
            scheduleToUpdate.InstructorId = addClassWithTimeDTO.InstructorId;

            _db.ClassSchedules.Update(scheduleToUpdate);
            _db.SaveChanges();

            return Ok(scheduleToUpdate);
        }


        [HttpDelete("DeleteClassSchedule/{id}")]
        public IActionResult DeleteClassSchedule(long id)
        {
            if (id <= 0) { return BadRequest("Please enter an Id higher than 0"); }

            var scheduleToDelete = _db.ClassSchedules.FirstOrDefault(cs => cs.Id == id);

            if (scheduleToDelete == null) { return NotFound("Class schedule not found"); }

            _db.ClassSchedules.Remove(scheduleToDelete);
            _db.SaveChanges();

            return Ok("Class schedule deleted successfully");
        }

        [HttpPost("AddNewClassSchedule")]
        public IActionResult AddNewClassSchedule([FromBody] AddClassWithTimeDTO addClassWithTimeDTO)
        {
            if (addClassWithTimeDTO.ClassId == null || addClassWithTimeDTO.StartTime == null ||
                addClassWithTimeDTO.EndTime == null || string.IsNullOrEmpty(addClassWithTimeDTO.AvailableDay))
            {
                return BadRequest("Invalid input data.");
            }

            var newSchedule = new ClassSchedule
            {
                ClassId = addClassWithTimeDTO.ClassId,
                AvailableDay = addClassWithTimeDTO.AvailableDay,
                StartTime = addClassWithTimeDTO.StartTime,
                EndTime = addClassWithTimeDTO.EndTime,
                InstructorId = addClassWithTimeDTO.InstructorId
            };

            _db.ClassSchedules.Add(newSchedule);
            _db.SaveChanges();
            return Ok(newSchedule);
        }

        [HttpGet("GetScheduleByID/{id}")]
        public IActionResult GetScheduleByID(long id)
        {
            if (id <= 0)
            {
                return BadRequest("Please enter an Id higher than 0");
            }

            var scheduleDetails = _db.ClassSchedules.FirstOrDefault(cs => cs.Id == id);
            if (scheduleDetails == null)
            {
                return NotFound("Class schedule not found");
            }

            var response = new
            {
                ScheduleId = scheduleDetails.Id,
                ClassId = scheduleDetails.ClassId,
                AvailableDay = scheduleDetails.AvailableDay,
                StartTime = scheduleDetails.StartTime,
                EndTime = scheduleDetails.EndTime,
                InstructorId = scheduleDetails.InstructorId
            };

            return Ok(response);
        }


        [HttpGet("GetAllSchedules")]
        public IActionResult GetAllSchedules()
        {
            var schedules = _db.ClassSchedules.ToList();
            if (schedules == null || !schedules.Any())
            {
                return NotFound("There are no class schedules");
            }
            return Ok(schedules);
        }

    }
}
