import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BurgerItem } from './delivery.service';
import { ToastController } from '@ionic/angular';

interface CartItem {
  item: BurgerItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  constructor(private storage: Storage, private toastController: ToastController) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const storedCart = await this.storage.get('cart');
    if (storedCart) {
      this.cart = storedCart;
    }
  }

  async addToCart(item: BurgerItem, quantity: number): Promise<void> {
    const existingCartItem = this.cart.find(cartItem => cartItem.item.id === item.id);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      this.cart.push({ item, quantity });
    }
    await this.saveCart();
    this.toast('Produto adicionado ao carrinho');
  }

  async removeFromCart(item: BurgerItem): Promise<void> {
    this.cart = this.cart.filter(cartItem => cartItem.item.id !== item.id);
    await this.saveCart();
    this.toast('Produto removido do carrinho');
  }

  async clearCart(): Promise<void> {
    this.cart = [];
    await this.saveCart();
    this.toast('Carrinho limpo');
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  private async saveCart(): Promise<void> {
    await this.storage.set('cart', this.cart);
  }

  async toast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
