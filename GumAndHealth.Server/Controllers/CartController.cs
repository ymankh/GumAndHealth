using GumAndHealth.Server.Models;
using GumAndHealth.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GumAndHealth.Server.DTOs.CartItemDTOs;
using GumAndHealth.Server.Services;

namespace GumAndHealth.Server.Controllers


{

    [Route("api/[controller]")]
    [ApiController]
    public class CartController(CartRepository cartRepository, MyDbContext context, IConfiguration config, PayPalPaymentService payPalService) : ControllerBase
    {
        private readonly string? _redirectUrl = config["PayPal:RedirectUrl"];

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(cartRepository.UserCart(CurrentUser.Id));
        }

        [Authorize]
        [HttpPost("AddToCart")]
        public IActionResult AddToCart([FromBody] UpdateCartItemDto updatedCartItem)
        {
            var cartItem = cartRepository.UpdateOrCreateCartItem(updatedCartItem, CurrentUser.Id);
            return Ok(cartItem);
        }

        [Authorize]
        [HttpDelete("DeleteCartItem/{productId:long}")]
        public IActionResult DeleteCartItem(long productId)
        {
            cartRepository.DeleteCartItem(productId, CurrentUser.Id);
            return NoContent();
        }
        [Authorize]
        [HttpDelete("ClearCart")]
        public IActionResult DeleteCartItem()
        {
            cartRepository.ClearCart(CurrentUser.Id);
            return NoContent();
        }


        private User CurrentUser
        {
            get
            {
                var userId = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = context.Users.Find(userId);
                return user;
            }
        }

        [Authorize]
        [HttpPost("checkout")]
        public IActionResult CreatePayment()
        {
            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");


            var totalPrice = cartRepository.GetTotalPrice(CurrentUser.Id);
            var payment = payPalService.CreatePayment(_redirectUrl ?? " ", totalPrice, null, CurrentUser.Id);
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }

        [HttpGet("success")]
        public IActionResult ExecutePayment(string paymentId, string PayerID, string token, int userId)
        {
            var order = cartRepository.Checkout(userId, paymentId);
            var executedPayment = payPalService.ExecutePayment(paymentId, PayerID);
            string script = "<script>window.close();</script>";
            return Content(script, "text/html");
        }

        [HttpGet("cancel")]
        public IActionResult CancelPayment()
        {
            return BadRequest("Payment canceled.");
        }

    }
}
