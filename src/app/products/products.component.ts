import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'T-Shirt', price: 49.99, image: 'assets/images/shirt.jpg' },
    {
      id: 2,
      name: 'Sneakers',
      price: 199.99,
      image: 'assets/images/sneakers.jpg',
    },
    {
      id: 3,
      name: 'Backpack',
      price: 129.99,
      image: 'assets/images/backpack.jpg',
    },
  ];

  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  addToCart(product: any) {
    const cartKey = `cart_${this.currentUser.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    cart.push(product);
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }
}
