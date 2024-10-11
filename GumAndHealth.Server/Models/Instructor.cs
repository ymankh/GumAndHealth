using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class Instructor
{
    public int Id { get; set; }

    public string? FullName { get; set; }

    public string? Bio { get; set; }

    public string? Credentials { get; set; }

    public virtual ICollection<ClassSchedule> ClassSchedules { get; set; } = new List<ClassSchedule>();
}
