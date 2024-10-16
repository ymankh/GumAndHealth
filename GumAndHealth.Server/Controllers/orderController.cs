﻿using GumAndHealth.Server.DTOs.OrderDTO;
using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class orderController : ControllerBase
    {
        private readonly MyDbContext _context;

        public orderController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<GetOrderDTO1>>> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)  // نحصل على المستخدم المرتبط بكل طلب
                .Include(o => o.OrderItems)  // نحصل على العناصر المرتبطة بكل طلب
                .ThenInclude(oi => oi.Product)  // نفترض أن لكل عنصر منتج مرتبط
                .ToListAsync();

            var orderDTOs = orders.Select(o => new GetOrderDTO1
            {
                Id = o.Id,
                UserName = o.User != null ? o.User.Name : "Unknown",  // عرض اسم المستخدم أو "غير معروف"
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount,
                Status = o.Status,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDTO1
                {
                    Id = oi.Id,
                    ProductName = oi.Product != null ? oi.Product.Name : "Unknown",  // عرض اسم المنتج
                    Quantity = (int)oi.Quantity,
                    Price = (decimal)(oi.Product != null ? oi.Product.Price : 0)  // عرض السعر بناءً على الـ ProductId
                }).ToList()
            }).ToList();

            return Ok(orderDTOs);
        }
        [HttpGet("search-orders")]
        public async Task<ActionResult<IEnumerable<GetOrderDTO1>>> SearchOrders(string? userName, DateTime? orderDate, string? productName)
        {
            // نبدأ الاستعلام من الجدول الأساسي
            var query = _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .AsQueryable();

            // إذا تم تمرير اسم المستخدم، نضيف شرط البحث بناءً عليه
            if (!string.IsNullOrEmpty(userName))
            {
                query = query.Where(o => o.User != null && o.User.Name.Contains(userName));
            }

            // إذا تم تمرير تاريخ الطلب، نضيف شرط البحث بناءً عليه
            if (orderDate.HasValue)
            {
                query = query.Where(o => o.OrderDate.HasValue && o.OrderDate.Value.Date == orderDate.Value.Date);
            }

            // إذا تم تمرير اسم المنتج، نضيف شرط البحث بناءً عليه
            if (!string.IsNullOrEmpty(productName))
            {
                query = query.Where(o => o.OrderItems.Any(oi => oi.Product != null && oi.Product.Name.Contains(productName)));
            }

            // تنفيذ الاستعلام
            var orders = await query.ToListAsync();

            // تحويل النتائج إلى DTOs
            var orderDTOs = orders.Select(o => new GetOrderDTO1
            {
                Id = o.Id,
                UserName = o.User != null ? o.User.Name : "Unknown",
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount,
                Status = o.Status,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDTO1
                {
                    Id = oi.Id,
                    ProductName = oi.Product != null ? oi.Product.Name : "Unknown",
                    Quantity = (int)oi.Quantity,
                    Price = (decimal)(oi.Product != null ? oi.Product.Price : 0)
                }).ToList()
            }).ToList();

            return Ok(orderDTOs);
        }
        // API لتعديل حالة الطلب
        [HttpPut("{id}/update-status")]
        public async Task<IActionResult> UpdateOrderStatus(long id)
        {
            // البحث عن الطلب بناءً على المعرف
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound(new { message = "Order not found" });
            }

            // التحقق من حالة الطلب الحالية
            if (order.Status == "0")
            {
                order.Status = "1"; // تغيير الحالة إلى 1
                await _context.SaveChangesAsync();
                return Ok(new { message = "Order status updated successfully" });
            }
            else
            {
                return BadRequest(new { message = "Order status is not 0" });
            }
        }



    }
}
