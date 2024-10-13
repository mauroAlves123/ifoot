import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { BurgerItem } from '../services/delivery.service';
import { Router } from '@angular/router';

interface CartItem {
  item: BurgerItem;
  quantity: number;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ionViewWillEnter() {
    this.loadCartItems();
  }

  async loadCartItems() {
    this.cartItems = await this.cartService.getCart();
    this.calculateTotal();

    console.log(this.cartItems)
  }

  async removeFromCart(cartItem: CartItem): Promise<void> {
    await this.cartService.removeFromCart(cartItem.item);
    this.loadCartItems();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  }

  checkout(): void {
    this.router.navigate(['/payment'], {
      queryParams: {
        totalAmount: this.totalAmount.toString()
      }
    });
  }

  async clearCart(): Promise<void> {
    await this.cartService.clearCart();
    this.loadCartItems();
  }
}
