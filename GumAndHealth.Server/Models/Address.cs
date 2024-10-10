using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class Address
{
    public long Id { get; set; }

    public long? UserId { get; set; }

    public string? City { get; set; }

    public string? Street { get; set; }

    public string? PhoneNumber { get; set; }

    public string? PostalCode { get; set; }

    public string? AddressLine { get; set; }

    public virtual User? User { get; set; }
}
