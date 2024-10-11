using GumAndHealth.Server.DTOs.CartItemDTOs;
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

        public CartItem? UpdateOrCreateCartItem(UpdateCartItemDto updateCartItem)
        {
            // Get the cart item if existed
            var cart = UserCart(updateCartItem.UserId);
            var cartItem = context.CartItems
                .FirstOrDefault(ci => ci.CartId == cart.Id && ci.ProductId == updateCartItem.ProductId);
            if (cartItem == null)
            {
                if (updateCartItem.Quantity == 0)
                    return null;

                // Create if not exist
                cartItem = new CartItem
                {
                    CartId = cart.Id,
                    ProductId = updateCartItem.ProductId,
                    Quantity = updateCartItem.Quantity
                };
                context.CartItems.Add(cartItem);
                context.SaveChanges();
                return cartItem;
            }
            cartItem.Quantity = updateCartItem.Quantity;
            // Update id existed
            context.Update(cartItem);
            context.SaveChanges();
            return cartItem;
        }

        public decimal GetTotalPrice(long userId)
        {
            var cart = UserCart(userId);
            return cart.CartItems.Sum(cItem => cItem.Product!.Price * cItem.Quantity ?? 0);
        }
    }
}
