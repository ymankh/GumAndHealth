using GumAndHealth.Server.Models;

namespace GumAndHealth.Server.Repositories
{
    public class CartRepository(MyDbContext context)
    {
        public Cart UserCart(long userId)
        {
            var cart = context.Carts.FirstOrDefault(c => c.UserId == userId);
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
