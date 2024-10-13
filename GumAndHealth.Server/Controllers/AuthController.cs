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
    public class AuthController(IConfiguration config, GenerateJwtToken generateJwt, MyDbContext context, AuthRepository authRepository)
        : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromForm] UserLoginDto loginData)
        {
            // Get the user using the login data
            var user = authRepository.GetUser(loginData);
            if (user == null)
            {
                return Unauthorized(new { message = "Bad Credentials" });
            }
            var token = generateJwt.Generate(user.Id);
            return Ok(new { token = token, id = user.Id });
        }

        [HttpPost("register")]
        public IActionResult Register([FromForm] UserRegisterDto register)
        {
            if (authRepository.GetUserByEmail(register.Email) != null)
            {
                return Unauthorized("User Email Already exist");
            }
            var user = authRepository.RegisterUser(register);
            return Created();
        }

        [HttpGet("GetUser")]
        [Authorize]
        public IActionResult GetUser()
        {
            return Ok(GetCurrentUser);
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

        //[HttpGet("all")]
        //public IActionResult GetAllUsers()
        //{
        //    return Ok(authRepository.All());
        //}

        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(long id)
        {
            var user = context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpPut("EditUser/{id}")]
        public IActionResult EditUser(int id, [FromForm] UserPutDTO edit)
        {
            var user = context.Users.FirstOrDefault(a => a.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.Name = edit.Name;
            user.Email = edit.Email;
            user.Username = edit.Username;
            context.Users.Update(user);
            context.SaveChanges();
            return Ok(user);
        }


        [HttpPut]
        public IActionResult ResetPassword([FromBody] resetPasswordDTO newpass)
        {
            var user = context.Users.FirstOrDefault(u => u.Email == newpass.Email);
            if (user == null)
            {
                return BadRequest();
            }
            byte[] newHash, newSalt;
            PasswordHasher.CreatePasswordHash(newpass.Password, out newHash, out newSalt);
            user.PasswordHash = newHash;
            user.PasswordSalt = newSalt;
            context.Users.Update(user);
            context.SaveChanges();
            return Ok(user);
        }


        [HttpPost("Google")]
        public IActionResult RegisterationFromGoogle([FromBody] RegisterGoogleDTO addUser)
        {
            var userfetch = authRepository.GetUserByEmail(addUser.email);

            if (userfetch == null)
            {
                userfetch = authRepository.RegisterUser(new DTOs.UserDTOs.UserRegisterDto
                {
                    Email = addUser.email,
                    Username = addUser.displayName,
                    Name = addUser.displayName,
                    Password = addUser.uid
                });

            }
            var token = generateJwt.Generate(userfetch.Id);
            return Ok(new { token });
        }

        [HttpGet("GetAddressById/{id}")]
        public IActionResult GetAddressById(int id)
        {
            var address = context.Addresses.FirstOrDefault(x => x.Id == id);
            if (address == null)
            {
                return BadRequest();
            }
            return Ok(address);
        }

        [HttpPost("PostAddress/{id}")]
        public IActionResult PostAddress(long id, [FromForm] AddressPutPostDTO address)
        {
            var newddress = new Address
            {
                UserId = id,
                City = address.City,
                Street = address.Street,
                PhoneNumber = address.PhoneNumber,
                PostalCode = address.PostalCode,
                AddressLine = address.AddressLine,
            };
            context.Addresses.Add(newddress);
            context.SaveChanges();
            return Ok();
        }

        [HttpPut("PutAddress/{id}")]
        public IActionResult PutAddress(long id, [FromForm] AddressPutPostDTO address)
        {
            var Existingaddress = context.Addresses.Find(id);
            if (Existingaddress == null)
            {
                return BadRequest();
            }
            Existingaddress.City = address.City;
            Existingaddress.Street = address.Street;
            Existingaddress.PhoneNumber = address.PhoneNumber;
            Existingaddress.PostalCode = address.PostalCode;
            Existingaddress.AddressLine = address.AddressLine;
            context.Addresses.Update(Existingaddress);
            context.SaveChanges();
            return Ok();
        }
    }
}
