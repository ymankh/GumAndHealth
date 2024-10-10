using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class Product
{
    public long Id { get; set; }

    public long? CategoryId { get; set; }

    public string? Name { get; set; }

    public decimal? Price { get; set; }

    public decimal? Discount { get; set; }

    public string? Tags { get; set; }

    public string? Image1 { get; set; }

    public string? Image2 { get; set; }

    public string? Image3 { get; set; }

    public string? Image4 { get; set; }

    public string? Image5 { get; set; }

    public string? Image6 { get; set; }

    public string? Image7 { get; set; }

    public string? Description { get; set; }

    public string? AdditionalInformation { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
