import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { InventoryService } from './inventory.service';

@Injectable()
export class CartService {
  cartItems: Product[] = [];
  products: Product[];

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.populatedList$.subscribe((response) => {
      // console.log(response);
      this.products = response;
    });
  }

  addToCart(product: Product) {
    if (this.products.find((i) => i.stock > 0 && i.id == product.id)) {
      let index = this.products.indexOf(product);
      this.products[index].stock--;
      this.products[index].qty++;
      this.cartItems.push(product);
    }
    console.log(this.products);
    console.log(this.cartItems);
  }

  removeFromCart(product: Product) {
    if (this.products.find((i) => i.id == product.id)) {
      console.log('remove if successful');
      let index = this.cartItems.indexOf(product);
      this.products[index].stock++;
      this.products[index].qty--;
      console.log(this.cartItems);
      this.cartItems.splice(index, 1);
    }
    console.log(this.products);
    console.log(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }
}
