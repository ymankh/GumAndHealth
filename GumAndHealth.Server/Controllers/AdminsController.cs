using GumAndHealth.Server.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GumAndHealth.Server.DTOs.UserDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using hosam.DTOs;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController(IConfiguration config, GenerateJwtToken generateJwt, MyDbContext context, AuthRepository authRepository)
    : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromForm] UserLoginDto admin)
        {

            var dbadmin = context.Admins.FirstOrDefault(u => u.Email == admin.Email);
            if (dbadmin == null || !PasswordHasher.VerifyPasswordHash(admin.Password, dbadmin.PasswordHash, dbadmin.PasswordSalt))
            {
                return Unauthorized(new { message = "Bad Credentials" });
            }
            var token = generateJwt.Generate(dbadmin.Id);
            return Ok(new { token = token, id = dbadmin.Id });
        }

        

        [HttpPost("Register")]
        public IActionResult AddUser([FromForm] AdminRegisterRequestDTO addAdmin)
        {
            var admin = context.Admins.FirstOrDefault(a => a.Email == addAdmin.Email);
            if(admin != null)
            {
                return BadRequest("email already used");
            }
            byte[] hash, salt;
            PasswordHasher.CreatePasswordHash(addAdmin.Password, out hash, out salt);
            var newuser = new Admin()
            {
                Email = addAdmin.Email,
                PasswordSalt = salt,
                PasswordHash = hash
            };
           context.Admins.Add(newuser);
           context.SaveChanges();
            return Ok(newuser);
        }
    }
}
