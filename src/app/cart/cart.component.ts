import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  ngOnInit(): void {
    this.loadCart();
  }

  // Load cart from localStorage
  loadCart(): void {
    const cartKey = `cart_${this.currentUser.email}`;
    this.cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  // Remove single item from cart
  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  // Clear all items from cart
  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  // Save updated cart and recalculate total
  private saveCart(): void {
    const cartKey = `cart_${this.currentUser.email}`;
    localStorage.setItem(cartKey, JSON.stringify(this.cartItems));
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}
