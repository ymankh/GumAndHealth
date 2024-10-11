using System.Security.Cryptography;
using System.Text;

namespace GumAndHealth.Server.Helpers
{
    public static class HashHelper
    {
        public static string HashPassword(string password, string salt)
        {
            using var sha256 = SHA256.Create();
            // Combine the password with the salt before hashing
            var saltedPassword = password + salt;
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
            var builder = new StringBuilder();
            foreach (var byteValue in bytes)
            {
                builder.Append(byteValue.ToString("x2"));
            }
            return builder.ToString();
        }
        public static byte[] ConvertStringToByteArray(string input)
        {
            if (string.IsNullOrEmpty(input))
                throw new ArgumentException("Input string cannot be null or empty.");

            return Encoding.UTF8.GetBytes(input);
        }
    }

}
