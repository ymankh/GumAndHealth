using GumAndHealth.Server.DTOs.ProductsDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(ProductsRepository productRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult AllProducts([FromQuery] ProductFilterDto productFilter)
        {
            var paginatedProducts = productRepository.GetPaginatedProduct(productFilter);
            return Ok(paginatedProducts);
        }
    }

}
