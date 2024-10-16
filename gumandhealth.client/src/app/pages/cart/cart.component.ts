import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../shared/interfaces';
import iziToast from 'izitoast';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to the cart observable to get cart items
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  // Calculate the total price of items in the cart
  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => {
      const price = item.product?.price ?? 0;
      const quantity = item.quantity ?? 1;
      return sum + price * quantity;
    }, 0);
  }

  // Remove an item from the cart
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  // Clear the entire cart
  clearCart(): void {
    this.cartService.clearCart();
  }
  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }
  proceedToCheckout() {
    this.cartService.checkout();
  }
  updateQuantity(item: CartItem) {
    this.cartService.updateQuantity(item);
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }
  incrementQuantity(item: CartItem) {
    item.quantity++;
    this.updateQuantity(item);
  }
}
