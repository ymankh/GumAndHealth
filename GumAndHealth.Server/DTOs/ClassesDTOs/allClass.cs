namespace GumAndHealth.Server.DTOs.ClassesDTOs
{
    public class allClass
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public decimal PricePerMonth { get; set; }
        public string AvailableDay { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string InstructorName { get; set; }
    }
}
