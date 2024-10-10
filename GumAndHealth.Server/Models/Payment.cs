using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class Payment
{
    public long Id { get; set; }

    public decimal? Amount { get; set; }

    public string? Method { get; set; }

    public string? TransactionId { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? DateAndTime { get; set; }

    public virtual ICollection<ClassSubscription> ClassSubscriptions { get; set; } = new List<ClassSubscription>();

    public virtual ICollection<GymSubscription> GymSubscriptions { get; set; } = new List<GymSubscription>();
}
