namespace GumAndHealth.Server.DTOs.RawaahOrder
{
        public class GetOrderDTO
        {
            public long Id { get; set; }
            public string UserName { get; set; }  
            public DateTime? OrderDate { get; set; }
            public decimal? TotalAmount { get; set; }
            public string? Status { get; set; }
            public List<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();
        }

        public class OrderItemDTO
        {
            public long Id { get; set; }
            public string ProductName { get; set; } 
            public int Quantity { get; set; }
            public decimal Price { get; set; }
        }



    
}
