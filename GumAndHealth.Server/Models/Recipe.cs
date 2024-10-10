using System;
using System.Collections.Generic;

namespace GumAndHealth.Server.Models;

public partial class Recipe
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public string? Description { get; set; }

    public long? RecipeCategoryId { get; set; }

    public long? CaloriesCount { get; set; }

    public string? Ingredients { get; set; }

    public string? Recipe1 { get; set; }

    public virtual RecipesCategory? RecipeCategory { get; set; }
}
