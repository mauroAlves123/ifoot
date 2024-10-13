import { Component, OnInit } from '@angular/core';
import { DeliveryService, BurgerItem } from '../services/delivery.service';
import { FavoritesService } from '../services/favorites.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  items: BurgerItem[] = [];
  filteredItems: BurgerItem[] = [];
  categories = ['Todos', 'Combos', 'Sliders', 'Clássicos'];
  selectedCategory: string = 'Todos';
  cartItemsCount: number = 0;
  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(
    private deliveryService: DeliveryService,
    private favoritesService: FavoritesService,
    private cartService: CartService,
  ) {}

  async ngOnInit() {
    this.filterItems();
    this.items = this.deliveryService.getItems();
    await this.syncFavorites();
    this.updateCartItemsCount();
  }

  async filterItems() {
    this.isLoading = true;

    setTimeout(() => {
      this.filteredItems = this.filterItemsLogic();
      this.isLoading = false;
    }, 500); 
  }

  private filterItemsLogic(): BurgerItem[] {
    let filteredItems = this.items;

    if (this.selectedCategory !== 'Todos') {
      filteredItems = filteredItems.filter(item => item.category === this.selectedCategory);
    }

    if (this.searchTerm.trim() !== '') {
      const searchTermLower = this.searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTermLower)
      );
    }

    return filteredItems;
  }

  async toggleFavorite(item: BurgerItem): Promise<void> {
    if (item.favorite) {
      await this.favoritesService.removeFavorite(item);
    } else {
      await this.favoritesService.addFavorite(item);
    }
    item.favorite = !item.favorite;
  }

  async addToCart(item: BurgerItem): Promise<void> {
    await this.cartService.addToCart(item, 1);
    this.updateCartItemsCount();
  }

  private async syncFavorites(): Promise<void> {
    const favorites = await this.favoritesService.getFavorites();
    this.items.forEach(item => {
      item.favorite = favorites.some(fav => fav.name === item.name);
    });
  }

  private updateCartItemsCount(): void {
    const cartItems = this.cartService.getCart();
    this.cartItemsCount = cartItems.length;
  }
}
