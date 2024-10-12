using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;

namespace GumAndHealth.Server.Services
{
    public class PayPalServiceR
    {
        private readonly PayPalHttpClient _client;

        public PayPalServiceR(IConfiguration configuration)
        {
            var clientId = configuration["PayPalR:ClientId"];
            var secret = configuration["PayPalR:Secret"];
            var isLive = configuration["PayPalR:IsLive"] == "true";

            PayPalEnvironment environment;

            if (isLive)
            {
                environment = new LiveEnvironment(clientId, secret);
            }
            else
            {
                environment = new SandboxEnvironment(clientId, secret);
            }

            _client = new PayPalHttpClient(environment);
        }

        public async Task<Order> CreateOrder(decimal amount, string currency, string returnUrl, string cancelUrl)
        {
            var orderRequest = new OrderRequest()
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        AmountWithBreakdown = new AmountWithBreakdown
                        {
                            CurrencyCode = currency,
                            Value = amount.ToString("F2")
                        }
                    }
                },
                ApplicationContext = new ApplicationContext
                {
                    ReturnUrl = returnUrl,
                    CancelUrl = cancelUrl
                }
            };

            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(orderRequest);

            var response = await _client.Execute(request);
            return response.Result<Order>();
        }

        public async Task<Order> CaptureOrder(string orderId)
        {
            var request = new OrdersCaptureRequest(orderId);
            request.RequestBody(new OrderActionRequest());

            var response = await _client.Execute(request);
            return response.Result<Order>();
        }
    }
}
