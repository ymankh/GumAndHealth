using GumAndHealth.Server.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GumAndHealth.Server.DTOs.UserDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IConfiguration config, GenerateJwtToken generateJwt, MyDbContext context, AuthRepository authRepository)
        : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDto loginData)
        {
            // Get the user using the login data
            var user = authRepository.GetUser(loginData);
            if (user == null)
            {
                return Unauthorized(new { message = "Bad Credentials" });
            }
            var token = generateJwt.Generate(user.Id);
            return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromForm] UserRegisterDto register)
        {
            var user = authRepository.RegisterUser(register);
            return Created();
        }

        [HttpGet("GetUser")]
        [Authorize]
        public IActionResult GetUser()
        {
            var user = GetCurrentUser();
            return Ok(user);
        }

        private User GetCurrentUser()
        {
            var userId = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var user = context.Users.Find(userId);
            return user;
        }
        //[HttpGet("all")]
        //public IActionResult GetAllUsers()
        //{
        //    return Ok(authRepository.All());
        //}
    }
}
