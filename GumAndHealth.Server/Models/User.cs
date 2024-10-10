using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class User
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Username { get; set; }

    public string? Email { get; set; }

    public string? Image { get; set; }

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<ClassSubscription> ClassSubscriptions { get; set; } = new List<ClassSubscription>();

    public virtual ICollection<GymSubscription> GymSubscriptions { get; set; } = new List<GymSubscription>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
