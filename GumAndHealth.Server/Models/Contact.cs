using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class Contact
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Message { get; set; }
}
