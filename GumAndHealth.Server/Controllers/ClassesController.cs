using GumAndHealth.Server.DTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using GumAndHealth.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayPal.Api;
namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly MyDbContext _db;
        string _redirectUrl;
        private PayPalServiceR payPalService;
        public ClassesController(MyDbContext db, IConfiguration config, PayPalServiceR paypal)
        {

            _db = db;

            _redirectUrl = config["PayPalR:RedirectUrl"] + "/api/Classes";

            payPalService = paypal;

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
                ClassPrice = classDetails.PricePerMonth,
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
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   

        [HttpPost("checkout")]
        public IActionResult CreatePayment([FromBody] PayRDTO payRDTO)
        {
            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");


            var totalPrice = _db.ClassServices.Where(x => x.Id == payRDTO.idSubs).FirstOrDefault().PricePerMonth ?? 0;

            var payment = payPalService.CreatePayment(_redirectUrl ?? " ", totalPrice, null, payRDTO.userID, payRDTO.idSubs);
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }

        [HttpGet("success")]
        public IActionResult ExecutePayment( string paymentId, string PayerID, string token, int userID, long subsId)
        {



            var subscription = new ClassSubscription()
            {
                ClassServiceId = subsId,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddMonths(1),
                UserId = userID,
                //PaymentId = paymentId
            };

            _db.ClassSubscriptions.Add(subscription);
                    _db.SaveChanges();

                


            var executedPayment = payPalService.ExecutePayment(paymentId, PayerID, userID, subsId);
            const string script = "<script>window.close();</script>";
            return Content(script, "text/html");

            
           
        }


        [HttpGet("cancel")]
        public IActionResult CancelPayment()
        {
            return BadRequest("Payment canceled.");
        }
    }

}

