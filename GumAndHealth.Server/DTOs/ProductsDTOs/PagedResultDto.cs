using GumAndHealth.Server.Models;

namespace GumAndHealth.Server.DTOs.ProductsDTOs
{
    public class PagedResultDto
    {
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public List<Product> Products { get; set; } = [];
    }
}
