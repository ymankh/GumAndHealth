using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class RecipesCategory
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? ImagePath { get; set; }

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}
