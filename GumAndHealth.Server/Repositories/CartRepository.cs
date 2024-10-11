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

        public CartItem? UpdateOrCreateCartItem(long productId, long userId, long quantity = 1)
        {
            // Get the cart item if existed
            var cart = UserCart(userId);
            var cartItem = context.CartItems
                .FirstOrDefault(ci => ci.CartId == cart.Id && ci.ProductId == productId);
            if (cartItem == null)
            {
                if (quantity == 0)
                    return null;

                // Create if not exist
                cartItem = new CartItem
                {
                    CartId = cart.Id,
                    ProductId = productId,
                    Quantity = quantity
                };
                context.CartItems.Add(cartItem);
                context.SaveChanges();
                return cartItem;
            }
            cartItem.Quantity = quantity;
            // Update id existed
            context.Update(cartItem);
            context.SaveChanges();
            return cartItem;
        }
    }
}
