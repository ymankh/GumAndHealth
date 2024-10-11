using GumAndHealth.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace GumAndHealth.Server.Repositories
{
    public class CartRepository(MyDbContext context)
    {
        public Cart UserCart(long userId)
        {
            var cart = context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product).FirstOrDefault(c => c.UserId == userId);
            if (cart != null) return cart;
            cart = new Cart
            {
                UserId = userId
            };
            context.Carts.Add(cart);
            context.SaveChanges();
            return cart;
        }
    }
}
