import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../shared/interfaces';  // Assuming you have a CartItem interface

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load cart from localStorage if available
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  // Fetch cart items from API (for online sync)
  loadCartFromServer(cartId: number) {
    this.http.get<CartItem[]>(`/api/cart/${cartId}`).subscribe((items) => {
      this.cartItems = items;
      this.cartSubject.next(this.cartItems);
      this.saveCartToLocalStorage();
    });
  }

  // Add item to cart
  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);

    if (existingItem) {
      existingItem.quantity! += item.quantity!;
    } else {
      this.cartItems.push(item);
    }
    this.cartSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  // Remove item from cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.cartSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    localStorage.removeItem('cart');
  }

  // Save cart items to local storage for offline use
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Get total price of items in the cart (adjust this if you want to include product details)
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product?.price ?? 0) * (item.quantity ?? 1), 0);
  }
}
