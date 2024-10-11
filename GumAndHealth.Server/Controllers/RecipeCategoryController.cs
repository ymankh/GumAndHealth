using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace GumAndHealth.Server.Controllers
{
   
        [Route("api/[controller]")]
        [ApiController]
        public class RecipeCategoryController : ControllerBase
        {
            private readonly MyDbContext _context;

            public RecipeCategoryController(MyDbContext context)
            {
                _context = context;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<RecipesCategory>>> GetRecipeCategories()
            {
                return await _context.RecipesCategories.ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<RecipesCategory>> GetRecipeCategory(long id)
            {
                var category = await _context.RecipesCategories
                                             .Include(c => c.Recipes)
                                             .FirstOrDefaultAsync(c => c.Id == id);

                if (category == null)
                {
                    return NotFound();
                }




                return category;
            }
        }

    }


