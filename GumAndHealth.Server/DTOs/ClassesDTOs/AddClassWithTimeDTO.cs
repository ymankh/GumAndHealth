namespace GumAndHealth.Server.DTOs.AdminClassService
{
    public class AddClassWithTimeDTO
    {
        public long? ClassId { get; set; }

        public string? AvailableDay { get; set; }

        public TimeOnly? StartTime { get; set; }

        public TimeOnly? EndTime { get; set; }

        public int? InstructorId { get; set; }
    }
}