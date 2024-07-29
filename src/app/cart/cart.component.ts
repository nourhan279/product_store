import { Component, OnInit } from '@angular/core';
import { Product } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.loadCart();
    this.calculateTotalPrice();
  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart.forEach((item) => {
      if (!item.quantity) {
        item.quantity = 1;
      }
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  increaseQuantity(productId: number): void {
    const item = this.cart.find((item) => item.id === productId);
    if (item) {
      item.quantity++;
      this.saveCart();
    }
  }

  decreaseQuantity(productId: number): void {
    const item = this.cart.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotalPrice();
  }
}
