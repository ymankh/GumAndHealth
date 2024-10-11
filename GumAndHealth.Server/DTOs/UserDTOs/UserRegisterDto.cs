namespace GumAndHealth.Server.DTOs.UserDTOs
{
    public class UserRegisterDto
    {

        public string? Name { get; set; }

        public string? Username { get; set; }

        public string? Email { get; set; }

        public IFormFile? Image { get; set; }

        public string Password { get; set; }

    }
}
