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

        [HttpPost]
        public IActionResult UpdateCartItem(UpdateCartItemDto updatedCartItem)
        {
            cartRepository.UpdateOrCreateCartItem(updatedCartItem);
            return Ok();
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

        //[HttpGet("success")]
        //public IActionResult ExecutePayment(string paymentId, string PayerID, string token, int userId)
        //{
        //    var user = db.Users.Find(userId);
        //    var (cartItems, cart) = GetAllCartItems(user);
        //    var totalAmount = cartItems.Sum(c => c.Price);

        //    // Create new order
        //    var order = new Order
        //    {
        //        UserId = user.UserId,
        //        Address = user.Address,
        //        OrderDate = DateTime.Now,
        //        ShippingStatus = "pending",
        //        CreatedAt = DateTime.Now,
        //        VoucherId = cart.VoucherId,
        //        TotalAmount = totalAmount
        //    };

        //    db.Orders.Add(order);
        //    db.SaveChanges();
        //    // Add the cart Items to the order
        //    foreach (var cartItem in cartItems)
        //    {
        //        var orderItem = new OrderItem
        //        {
        //            OrderId = order.OrderId,
        //            Quantity = cartItem.Quantity,
        //            TotalPrice = cartItem.Price,
        //            ProductId = cartItem.ProductId

        //        };
        //        db.OrderItems.Add(orderItem);
        //        db.CartItems.Remove(cartItem);
        //    }
        //    db.Carts.Remove(cart);

        //    var executedPayment = payPalService.ExecutePayment(paymentId, PayerID);
        //    var payment = new Payment
        //    {
        //        Status = executedPayment.state,
        //        OrderId = order.OrderId,
        //        Amount = order.TotalAmount,
        //        PaymentMethod = "Paypal",
        //        PaymentDate = DateTime.Now,
        //        TransactionId = executedPayment.id,
        //        PaymentGateway = "Paypal"
        //    };
        //    db.Payments.Add(payment);
        //    db.SaveChanges();
        //    string script = "<script>window.close();</script>";
        //    return Content(script, "text/html");
        //}

        //[HttpGet("cancel")]
        //public IActionResult CancelPayment()
        //{
        //    return BadRequest("Payment canceled.");
        //}

    }
}
