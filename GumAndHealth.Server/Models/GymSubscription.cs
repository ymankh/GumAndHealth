using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class GymSubscription
{
    public long Id { get; set; }

    public long? GymServiceId { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public long? UserId { get; set; }

    public long? PaymentId { get; set; }

    public virtual GymService? GymService { get; set; }

    public virtual Payment? Payment { get; set; }

    public virtual User? User { get; set; }
}
