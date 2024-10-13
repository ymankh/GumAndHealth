using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace GumAndHealth.Server.Models;

public partial class ClassSchedule
{
    public long Id { get; set; }

    public long? ClassId { get; set; }

    public string? AvailableDay { get; set; }

    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public int? InstructorId { get; set; }
    
    public virtual ClassService? Class { get; set; }
    
    public virtual Instructor? Instructor { get; set; }
}
