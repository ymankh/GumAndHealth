namespace GumAndHealth.Server.DTOs.ClassesDTOs
{
    public class AddClassServiceDTO
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public IFormFile? ImagePath { get; set; }

        public decimal? PricePerMonth { get; set; }

    }
}
