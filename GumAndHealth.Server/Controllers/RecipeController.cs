using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace GumAndHealth.Server.Controllers
{
   
        [Route("api/[controller]")]
        [ApiController]
        public class RecipeController : ControllerBase
        {
        private readonly MyDbContext _context;

        public RecipeController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
            public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
            {
                return await _context.Recipes.ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<Recipe>> GetRecipe(long id)
            {
                var recipe = await _context.Recipes.FirstOrDefaultAsync(r => r.Id == id);

                if (recipe == null)
                {
                    return NotFound();
                }

                return recipe;
            }
        }

    }

