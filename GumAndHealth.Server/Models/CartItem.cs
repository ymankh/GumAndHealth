using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class CartItem
{
    public long Id { get; set; }

    public long? ProductId { get; set; }

    public long? CartId { get; set; }

    public long? Quantity { get; set; }

    public virtual Cart? Cart { get; set; }

    public virtual Product? Product { get; set; }
}
