using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(CartRepository cartRepository, MyDbContext context) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var user = GetCurrentUser;
            return Ok(cartRepository.UserCart(user.Id));
        }

        private User GetCurrentUser
        {
            get
            {
                var userId = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = context.Users.Find(userId);
                return user;
            }
        }
    }
}
