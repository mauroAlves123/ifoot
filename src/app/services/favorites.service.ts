import { Injectable } from '@angular/core';
import { BurgerItem } from './delivery.service';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: BurgerItem[] = [];
  private favoritesSubject: BehaviorSubject<BurgerItem[]> = new BehaviorSubject<BurgerItem[]>([]);

  favorites$ = this.favoritesSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.favorites = (await this.storage.get('favorites')) || [];
    this.favoritesSubject.next(this.favorites);
  }

  async addFavorite(item: BurgerItem): Promise<void> {
    if (!this.favorites.some(favorite => favorite.name === item.name)) {
      this.favorites.push(item);
      await this.storage.set('favorites', this.favorites);
      this.favoritesSubject.next(this.favorites);
    }
  }

  async removeFavorite(item: BurgerItem): Promise<void> {
    this.favorites = this.favorites.filter(favorite => favorite.name !== item.name);
    await this.storage.set('favorites', this.favorites);
    this.favoritesSubject.next(this.favorites);
  }

  getFavorites(): Promise<BurgerItem[]> {
    return this.storage.get('favorites') || [];
  }
}
