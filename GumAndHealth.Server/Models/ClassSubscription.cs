using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class ClassSubscription
{
    public long Id { get; set; }

    public long? ClassServiceId { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public long? UserId { get; set; }

    public long? PaymentId { get; set; }

    public virtual ClassService? ClassService { get; set; }

    public virtual Payment? Payment { get; set; }

    public virtual User? User { get; set; }
}
