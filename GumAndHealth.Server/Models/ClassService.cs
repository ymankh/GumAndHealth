using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class ClassService
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? ImagePath { get; set; }

    public decimal? PricePerMonth { get; set; }

    public virtual ICollection<ClassSubscription> ClassSubscriptions { get; set; } = new List<ClassSubscription>();
}
