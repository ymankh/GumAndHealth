using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class Order
{
    public long Id { get; set; }

    public long? UserId { get; set; }

    public DateTime? OrderDate { get; set; }

    public decimal? TotalAmount { get; set; }

    public string? Status { get; set; }

    public long? PaymentId { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User? User { get; set; }
}
