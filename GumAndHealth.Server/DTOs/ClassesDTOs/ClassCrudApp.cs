using GumAndHealth.Server.Models;

namespace GumAndHealth.Server.DTOs.ClassesDTOs
{
    public class ClassCrudApp
    {

        public long Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? ImagePath { get; set; }

        public decimal? PricePerMonth { get; set; }

        public virtual ICollection<ClassSchedule> ClassSchedules { get; set; } = new List<ClassSchedule>();

        public virtual ICollection<ClassSubscription> ClassSubscriptions { get; set; } = new List<ClassSubscription>();

    }
}
