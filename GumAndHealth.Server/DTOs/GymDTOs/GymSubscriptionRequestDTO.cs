namespace GumAndHealth.Server.DTOs.GymDTOs
{
    public class GymSubscriptionRequestDTO
    {
        public long? GymServiceId { get; set; }

    }

    public class PaymentDTO
    {
        public decimal? Amount { get; set; }

        public string? Method { get; set; }

        public string? TransactionId { get; set; }

        public DateTime? DateAndTime { get; set; }
    }
}
