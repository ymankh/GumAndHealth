using GumAndHealth.Server.DTOs.UserDTOs;
using GumAndHealth.Server.Helpers;
using GumAndHealth.Server.Models;
using System.Data;
using GumAndHealth.Server.shared;

namespace GumAndHealth.Server.Repositories
{
    public class AuthRepository(MyDbContext context)
    {
        public User? GetUser(UserLoginDto loginData)
        {

            var user = context.Users.SingleOrDefault(u => u.Email == loginData.Email);
            if (user == null)

                return null;


            var hashedPassword = HashHelper.HashPassword(loginData.password, user.PasswordSalt.ToString());

            return user.PasswordHash.ToString() == hashedPassword ? user : null;

        }

        public User RegisterUser(UserRegisterDto userData)
        {
            // Generate a unique salt for this user
            var salt = SaltHelper.GenerateSalt(16);  // 16 bytes salt

            // Hash the password with the salt
            var hashedPassword = HashHelper.HashPassword(userData.Password, salt);
            var user = new User
            {
                Email = userData.Email,
                PasswordHash = HashHelper.ConvertStringToByteArray(hashedPassword),
                PasswordSalt = HashHelper.ConvertStringToByteArray(salt),
                CreatedAt = DateTime.Now,
                Name = userData.Name,
                Username = userData.Username
            };
            if (userData.Image != null)
            {
                user.Image = ImageSaver.SaveImage(userData.Image);
            }
            context.Users.Add(user);
            context.SaveChanges();
            return user;
        }
    }
}
