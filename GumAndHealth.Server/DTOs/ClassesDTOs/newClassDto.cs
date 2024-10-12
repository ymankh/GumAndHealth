using System.Diagnostics;

namespace GumAndHealth.Server.DTOs.ClassesDTOs
{
    public class newClassDto
    {
        public ClassServiceDto ClassService { get; set; }
        
        public class ClassServiceDto
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string ImagePath { get; set; }
            public decimal PricePerMonth { get; set; }
            public ICollection<ClassScheduleDto> ClassSchedules { get; set; } // One-to-many
        }

        public class ClassScheduleDto
        {
            public long Id { get; set; }
            public string AvailableDay { get; set; }
            public TimeSpan StartTime { get; set; }
            public TimeSpan EndTime { get; set; }
            public long ClassServiceId { get; set; } // Foreign key
            public int? InstructorId { get; set; } // Change this to int? if needed
        }
    }
}
