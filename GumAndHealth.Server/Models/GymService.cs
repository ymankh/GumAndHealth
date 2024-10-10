using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class GymService
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? ImagePath { get; set; }

    public decimal? PricePerMonth { get; set; }

    public TimeOnly? WomenShiftStart { get; set; }

    public TimeOnly? WomenShiftEnd { get; set; }

    public TimeOnly? MenShiftStart { get; set; }

    public TimeOnly? MenShiftEnd { get; set; }

    public bool? IsMixed { get; set; }

    public virtual ICollection<GymSubscription> GymSubscriptions { get; set; } = new List<GymSubscription>();
}
