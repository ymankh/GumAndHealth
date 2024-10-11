using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using hosam.DTOs;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private MyDbContext _db;
        private TokenGenerator _tokenGenerator;
        public UsersController(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;

        }


        [HttpPost("Register")]
        public IActionResult AddUser([FromForm] UserRegisterRequestDTO addUser)
        {
            byte[] hash, salt;
            PasswordHasher.CreatePasswordHash(addUser.Password, out hash, out salt);
            var newuser = new User()
            {
                Name = addUser.Username,
                Email = addUser.Email,
                Username = addUser.Username,
                PasswordSalt = salt,
                PasswordHash = hash
            };
            _db.Users.Add(newuser);
            _db.SaveChanges();
            var user = _db.Users.FirstOrDefault(u => u.Email == newuser.Email);
            var cart = new Cart() { UserId = user.Id };
            _db.Carts.Add(cart);
            _db.SaveChanges();
            return Ok(newuser);
        }


        [HttpPost("Login")]
        public IActionResult Login([FromForm] UserLoginRequestDTO user)
        {
            var dbuser = _db.Users.FirstOrDefault(u => u.Email == user.Email);
            if (dbuser == null || !PasswordHasher.VerifyPasswordHash(user.Password, dbuser.PasswordHash, dbuser.PasswordSalt))
            {
                return BadRequest("Login Unauthorized!");
            }
            var roles = dbuser.Status.Split(" ").ToList();
            var token = _tokenGenerator.GenerateToken(dbuser.Email, roles);

            return Ok(new { Token = token, UserId = dbuser.Id, userStatus = dbuser.Status });
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_db.Users.ToList());
        }

        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(long id)
        {
            var user = _db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpPut("EditUser/{id}")]
        public IActionResult EditUser(int id, [FromForm] UserPutDTO edit)
        {
            var user = _db.Users.Where(a => a.Id == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            user.Name = edit.Name;
            user.Email = edit.Email;
            user.Username = edit.Username;
            _db.Users.Update(user);
            _db.SaveChanges();
            return Ok(user);
        }


        [HttpPut]
        public IActionResult ResetPassword([FromBody] resetPasswordDTO newpass)
        {
            var user = _db.Users.Where(u => u.Email == newpass.Email).FirstOrDefault();
            if (user == null)
            {
                return BadRequest();
            }
            byte[] newHash, newSalt;
            PasswordHasher.CreatePasswordHash(newpass.Password, out newHash, out newSalt);
            user.PasswordHash = newHash;
            user.PasswordSalt = newSalt;
            _db.Users.Update(user);
            _db.SaveChanges();
            return Ok(user);
        }


        [HttpPost("Google")]
        public IActionResult RegisterationFromGoogle([FromBody] RegisterGoogleDTO addUser)
        {
            var userfetch = _db.Users.Where(x => x.Email == addUser.email).FirstOrDefault();

            if (userfetch == null)
            {
                byte[] hash, salt;
                PasswordHasher.CreatePasswordHash(addUser.uid, out hash, out salt);
                var newuser = new User()
                {
                    Name = addUser.displayName,
                    Email = addUser.email,
                    Username = addUser.displayName,
                    PasswordSalt = salt,
                    PasswordHash = hash
                };
                _db.Users.Add(newuser);
                _db.SaveChanges();
                var user = _db.Users.FirstOrDefault(u => u.Email == newuser.Email);
                var cart = new Cart() { UserId = user.Id };
                _db.Carts.Add(cart);
                _db.SaveChanges();

                var roles = user.Status.Split(" ").ToList();
                var token = _tokenGenerator.GenerateToken(user.Email, roles);
                return Ok(new { Token = token, userID = user.Id, userStatus = user.Status });
            }
            else
            {

                var user = _db.Users.FirstOrDefault(x => x.Email == addUser.email);
                if (user == null || !PasswordHasher.VerifyPasswordHash(addUser.uid, user.PasswordHash, user.PasswordSalt))
                {
                    return Unauthorized("Invalid username or password.");
                }

                var Status = user.Status.Split(" ").ToList();
                var token = _tokenGenerator.GenerateToken(user.Email, Status);

                return Ok(new { Token = token, userID = user.Id, userStatus = user.Status });
            }
        }

        [HttpGet("GetAddressById/{id}")]
        public IActionResult GetAddressById(int id)
        {
            var address = _db.Addresses.FirstOrDefault(x => x.Id == id);
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
            _db.Addresses.Add(newddress);
            _db.SaveChanges();
            return Ok();
        }

        [HttpPut("PutAddress/{id}")]
        public IActionResult PutAddress(long id, [FromForm] AddressPutPostDTO address)
        {
            var Existingaddress = _db.Addresses.Find(id);
            if (Existingaddress == null)
            {
                return BadRequest();
            }
            Existingaddress.City = address.City;
            Existingaddress.Street = address.Street;
            Existingaddress.PhoneNumber = address.PhoneNumber;
            Existingaddress.PostalCode = address.PostalCode;
            Existingaddress.AddressLine = address.AddressLine;
            _db.Addresses.Update(Existingaddress);
            _db.SaveChanges();
            return Ok();
        }
    }
}
