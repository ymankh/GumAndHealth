using System.ComponentModel.DataAnnotations;

namespace GumAndHealth.Server.DTOs.UserDTOs
{
    public class UserLoginDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
