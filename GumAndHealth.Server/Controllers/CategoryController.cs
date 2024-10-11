using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(CategoryRepository categoryRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCategories()
        {
            return Ok(categoryRepository.GetCategories());
        }
    }

}
