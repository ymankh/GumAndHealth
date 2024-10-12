using GumAndHealth.Server.DTOs.UserProfile;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UserProfileController(MyDbContext context)
        {
            _context = context;
        }

        // لجلب بيانات المستخدم
        [HttpGet("{id}")]
        public async Task<ActionResult<GetDTOUSER>> GetUserProfile(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == id);

            var GetDTOUSER = new GetDTOUSER
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                Email = user.Email,
                Image = user.Image,
                City = address?.City,
                Street = address?.Street,
                PhoneNumber = address?.PhoneNumber,
                PostalCode = address?.PostalCode,
                AddressLine = address?.AddressLine
            };

            return Ok(GetDTOUSER);
        }









        [HttpGet("getImages/{ImageName}")]

        public IActionResult getImage(string ImageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "images", ImageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpeg");

            }
            return NotFound();


        }








        [HttpPut("UpdateUserProfile{id}")]
        public async Task<IActionResult> UpdateUserProfile(long id, [FromForm] UserProfileDTO updatedUserDto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Name = updatedUserDto.Name;
            user.Username = updatedUserDto.Username;
            user.Email = updatedUserDto.Email;

            // التأكد من أن صورة المستخدم موجودة قبل حفظها
            if (updatedUserDto.Image != null)
            {
                // تحديد المسار الكامل لحفظ الصورة
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");

                // التأكد من وجود المجلد، وإنشاءه إن لم يكن موجودًا
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                // تحديد المسار الكامل للصورة
                var imageFilePath = Path.Combine(folder, updatedUserDto.Image.FileName);

                // حفظ الصورة في المسار المحدد
                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    await updatedUserDto.Image.CopyToAsync(stream); // استخدم CopyToAsync
                }

                // تحديث مسار الصورة في قاعدة البيانات
                user.Image = $"{updatedUserDto.Image.FileName}"; // ضبط المسار بشكل صحيح
            }

            // تحديث العنوان
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == id);

            if (address != null)
            {
                address.City = updatedUserDto.City;
                address.Street = updatedUserDto.Street;
                address.PhoneNumber = updatedUserDto.PhoneNumber;
                address.PostalCode = updatedUserDto.PostalCode;
                address.AddressLine = updatedUserDto.AddressLine;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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



        // التحقق من وجود المستخدم
        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);
        }


        [HttpGet("GetAllSubscription/{id}")]
        public async Task<IActionResult> GetAllSubscription(long id)
        {
            // جلب الاشتراكات بناءً على معرف المستخدم
            var gymSubscriptions = await _context.GymSubscriptions
                .Where(s => s.UserId == id) // تحقق من أن الاشتراكات تخص المستخدم المطلوب
                .ToListAsync(); // جلب النتائج كقائمة

            // التحقق من وجود اشتراكات
            if (!gymSubscriptions.Any())
            {
                return NotFound("لا توجد اشتراكات لهذا المستخدم.");
            }

            // إرجاع الاشتراكات بنجاح
            return Ok(gymSubscriptions);
        }



        [HttpGet("GetAllOrders/{id}")]
        public async Task<IActionResult> GetAllOrders(long id)
        {
   

            var orders = await _context.Orders
                .Where(o => o.UserId == id)

                .ToListAsync();
            if (!orders.Any())
            {
                return NotFound("لا توجد طلبات لهذا المستخدم.");
            }

          

            return Ok(orders);
        }

    }
}
