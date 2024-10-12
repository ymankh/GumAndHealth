using GumAndHealth.Server.DTOs.GymDTOs;
using GumAndHealth.Server.Models;
using GumAndHealth.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymsSubscriptionController : ControllerBase
    {
        private readonly string? _redirectUrl;
        private readonly MyDbContext _db;
        private readonly PayPalPaymentService _payPalService;

        public GymsSubscriptionController(MyDbContext db, IConfiguration config, PayPalPaymentService payPalService)
        {
            _redirectUrl = config["PayPal:RedirectUrl"] + "/api/GymsSubscription";
            _payPalService = payPalService;
            _db = db;
        }

        [Authorize]
        [HttpPost("AddNewGymSubscription")]
        public IActionResult AddNewGymSubscription([FromBody] GymSubscriptionRequestDTO gymDTO)
        {




            var gym = _db.GymServices.FirstOrDefault(g => g.Id == gymDTO.GymServiceId.Value);
            if (gym == null)
            {
                return NotFound("Gym service not found.");
            }


            var amount = gym.PricePerMonth;


            var newPayment = new Models.Payment
            {
                Amount = amount,
                Status = "Pending",
                Method = "Paypal",
            };


            _db.Payments.Add(newPayment);
            _db.SaveChanges();


            var startDate = DateTime.Now;
            var endDate = startDate.AddDays(30);


            var newSubscription = new GymSubscription
            {
                GymServiceId = gymDTO.GymServiceId.Value,
                StartDate = startDate,
                EndDate = endDate,
                //UserId = 1, //user is fixed for now
                UserId = CurrentUser.Id,
                PaymentId = newPayment.Id
            };


            _db.GymSubscriptions.Add(newSubscription);
            _db.SaveChanges();

            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");

            var totalPrice = gym.PricePerMonth!;
            var payment = _payPalService.CreatePayment(_redirectUrl ?? " ", (decimal)totalPrice, null, CurrentUser.Id);
            //var payment = _payPalService.CreatePayment(_redirectUrl ?? " ", (decimal)totalPrice, null, 1); //user is fixed for now
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }

        [HttpGet("success")]
        public IActionResult ExecutePayment(string paymentId, string PayerID, string token, long userId)
        {
            var subsecription = _db.GymSubscriptions.Include(s => s.Payment).Where(s => s.UserId == userId).OrderByDescending(s => s.EndDate).FirstOrDefault();
            var payment = subsecription.Payment;
            payment.Status = "compleated";
            payment.TransactionId = paymentId;
            _db.Payments.Update(payment);
            _db.SaveChanges();
            var executedPayment = _payPalService.ExecutePayment(paymentId, PayerID);
            string script = "<script>window.close();</script>";
            return Content(script, "text/html");
        }

        [HttpGet("cancel")]
        public IActionResult CancelPayment()
        {
            return BadRequest("Payment canceled.");
        }

        private User CurrentUser
        {
            get
            {
                var userId = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = _db.Users.Find(userId);
                return user;
            }
        }

    }
}