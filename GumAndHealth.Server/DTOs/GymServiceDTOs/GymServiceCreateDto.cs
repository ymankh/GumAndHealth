namespace GumAndHealth.Server.DTOs.GymServiceDTOs
{
    public class GymServiceCreateDto
    {

        public string Name { get; set; }

        public string Description { get; set; }

        public IFormFile Image { get; set; }

        public decimal PricePerMonth { get; set; }

        public TimeOnly? WomenShiftStart { get; set; }

        public TimeOnly? WomenShiftEnd { get; set; }

        public TimeOnly? MenShiftStart { get; set; }

        public TimeOnly? MenShiftEnd { get; set; }

        public bool? IsMixed { get; set; }
    }
}
