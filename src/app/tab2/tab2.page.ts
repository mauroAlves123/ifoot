import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { BurgerItem } from '../services/delivery.service';
import { CartService } from '../services/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  favorites: BurgerItem[] = [];
  cartItemsCount: number = 0;
  private favoritesSubscription?: Subscription;

  constructor(
    private favoritesService: FavoritesService, 
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.favoritesSubscription = this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
      this.cdr.detectChanges();
    });
    this.loadFavorites();
  }

  ngOnDestroy() {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  async loadFavorites() {
    this.favorites = await this.favoritesService.getFavorites();
    this.syncFavorites();
  }

  async toggleFavorite(item: BurgerItem): Promise<void> {
    if (item.favorite) {
      await this.favoritesService.removeFavorite(item);
    } else {
      await this.favoritesService.addFavorite(item);
    }
    item.favorite = !item.favorite;
    this.loadFavorites();
  }

  private async syncFavorites(): Promise<void> {
    const favorites = await this.favoritesService.getFavorites();
    this.favorites.forEach(item => {
      item.favorite = favorites.some(fav => fav.name === item.name);
    });
    this.cdr.detectChanges();
  }

  private updateCartItemsCount(): void {
    const cartItems = this.cartService.getCart();
    this.cartItemsCount = cartItems.length;
  }
}
