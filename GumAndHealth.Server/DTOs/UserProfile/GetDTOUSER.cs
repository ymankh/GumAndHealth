namespace GumAndHealth.Server.DTOs.UserProfile
{
    public class GetDTOUSER
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Image { get; set; }
        public DateTime? CreatedAt { get; set; }

        // بيانات العنوان
        public string? City { get; set; }
        public string? Street { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PostalCode { get; set; }
        public string? AddressLine { get; set; }
    }
}
