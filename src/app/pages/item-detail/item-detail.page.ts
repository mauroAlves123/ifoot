import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService, BurgerItem } from 'src/app/services/delivery.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  item: BurgerItem | undefined;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.deliveryService.getItemById(itemId);
  }

  async addToCart() {
    if (this.item) {
      await this.cartService.addToCart(this.item, this.quantity);
      this.router.navigate(['/tabs/tab3']);
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
