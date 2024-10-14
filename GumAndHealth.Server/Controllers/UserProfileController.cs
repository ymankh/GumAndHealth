using GumAndHealth.Server.DTOs.RawaahOrder;
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








        //[HttpPut("UpdateUserProfile{id}")]
        //public async Task<IActionResult> UpdateUserProfile(long id, [FromForm] UserProfileDTO updatedUserDto)
        //{
        //    var user = await _context.Users.FindAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    user.Name = updatedUserDto.Name;
        //    user.Username = updatedUserDto.Username;
        //    user.Email = updatedUserDto.Email;

        //    // التأكد من أن صورة المستخدم موجودة قبل حفظها
        //    if (updatedUserDto.Image != null)
        //    {
        //        // تحديد المسار الكامل لحفظ الصورة
        //        var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");

        //        // التأكد من وجود المجلد، وإنشاءه إن لم يكن موجودًا
        //        if (!Directory.Exists(folder))
        //        {
        //            Directory.CreateDirectory(folder);
        //        }

        //        // تحديد المسار الكامل للصورة
        //        var imageFilePath = Path.Combine(folder, updatedUserDto.Image.FileName);

        //        // حفظ الصورة في المسار المحدد
        //        using (var stream = new FileStream(imageFilePath, FileMode.Create))
        //        {
        //            await updatedUserDto.Image.CopyToAsync(stream); // استخدم CopyToAsync
        //        }

        //        // تحديث مسار الصورة في قاعدة البيانات
        //        user.Image = $"{updatedUserDto.Image.FileName}"; // ضبط المسار بشكل صحيح
        //    }

        //    // تحديث العنوان
        //    var address = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == id);

        //    if (address != null)
        //    {
        //        address.City = updatedUserDto.City;
        //        address.Street = updatedUserDto.Street;
        //        address.PhoneNumber = updatedUserDto.PhoneNumber;
        //        address.PostalCode = updatedUserDto.PostalCode;
        //        address.AddressLine = updatedUserDto.AddressLine;
        //    }

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!UserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}


        [HttpPut("UpdateUserProfile/{id}")]
        public async Task<IActionResult> UpdateUserProfile(long id, [FromForm] UserProfileDTO updatedUserDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // تحديث بيانات المستخدم
            user.Name = updatedUserDto.Name;
            user.Username = updatedUserDto.Username;
            user.Email = updatedUserDto.Email;

            // حفظ الصورة إذا تم رفعها
            if (updatedUserDto.Image != null)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                var imageFilePath = Path.Combine(folder, updatedUserDto.Image.FileName);
                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    await updatedUserDto.Image.CopyToAsync(stream);
                }
                user.Image = updatedUserDto.Image.FileName;
            }

            // تحديث العنوان في حالة وجوده
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == user.Id);

            if (address != null)
            {
                // تحديث البيانات الموجودة
                address.City = updatedUserDto.City;
                address.Street = updatedUserDto.Street;
                address.PhoneNumber = updatedUserDto.PhoneNumber;
                address.PostalCode = updatedUserDto.PostalCode;
                address.AddressLine = updatedUserDto.AddressLine;
            }
            else
            {
                // إنشاء سجل جديد في جدول العنوان إذا لم يكن موجودًا
                address = new Address
                {
                    UserId = user.Id,
                    City = updatedUserDto.City,
                    Street = updatedUserDto.Street,
                    PhoneNumber = updatedUserDto.PhoneNumber,
                    PostalCode = updatedUserDto.PostalCode,
                    AddressLine = updatedUserDto.AddressLine
                };

                _context.Addresses.Add(address); // إضافة العنوان الجديد إلى السياق
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }




        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);
        }


        //[HttpGet("GetAllSubscription/{id}")]
        //public async Task<IActionResult> GetAllSubscription(long id)
        //{
        //    // جلب الاشتراكات بناءً على معرف المستخدم
        //    var gymSubscriptions = await _context.GymSubscriptions
        //        .Where(s => s.UserId == id) // تحقق من أن الاشتراكات تخص المستخدم المطلوب
        //        .ToListAsync(); // جلب النتائج كقائمة

        //    // التحقق من وجود اشتراكات
        //    if (!gymSubscriptions.Any())
        //    {
        //        return NotFound("لا توجد اشتراكات لهذا المستخدم.");
        //    }

        //    // إرجاع الاشتراكات بنجاح
        //    return Ok(gymSubscriptions);
        //}

        [HttpGet("GetAllSubscription/{id}")]
        public async Task<IActionResult> GetAllSubscription(long id)
        {
            var gymSubscriptions = await _context.GymSubscriptions
      .Where(s => s.UserId == id)
      .Include(s => s.GymService) // تأكد من أن لديك علاقة صحيحة في الـ DbContext
      .Select(s => new
      {
          s.Id,
          s.StartDate,
          s.EndDate,
          s.PaymentId,
          GymName = s.GymService.Name // جلب اسم الجيم
      })
      .ToListAsync();






            return Ok(gymSubscriptions);
        }

        [HttpGet("orders/{userId}")]
        public async Task<ActionResult<IEnumerable<GetOrderDTO>>> GetOrdersByUserId(int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId) 
                .Include(o => o.User) 
                .Include(o => o.OrderItems) 
                .ThenInclude(oi => oi.Product) 
                .ToListAsync();

            var orderDTOs = orders.Select(o => new GetOrderDTO
            {
                Id = o.Id,
                UserName = o.User != null ? o.User.Name : "Unknown", 
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount,
                Status = o.Status,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDTO
                {
                    Id = oi.Id,
                    ProductName = oi.Product != null ? oi.Product.Name : "Unknown", // عرض اسم المنتج
                    Quantity = (int)oi.Quantity,
                    Price = (decimal)(oi.Product != null ? oi.Product.Price : 0) // عرض السعر بناءً على الـ ProductId
                }).ToList()
            }).ToList();

            return Ok(orderDTOs);
        }

    }
}
