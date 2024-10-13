namespace GumAndHealth.Server.DTOs.OrderDTO
{
    
        public class GetOrderDTO1
        {
            public long Id { get; set; }
            public string UserName { get; set; }  // نعرض اسم المستخدم
            public DateTime? OrderDate { get; set; }
            public decimal? TotalAmount { get; set; }
            public string? Status { get; set; }
            public List<OrderItemDTO1> OrderItems { get; set; } = new List<OrderItemDTO1>();
        }

        public class OrderItemDTO1
        {
            public long Id { get; set; }
            public string ProductName { get; set; }  // افتراضًا أنك ستحتاج إلى اسم المنتج
            public int Quantity { get; set; }
            public decimal Price { get; set; }
        }



    }

