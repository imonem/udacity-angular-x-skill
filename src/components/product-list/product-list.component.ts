import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { InventoryService } from '../../services/inventory.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private inventoryService: InventoryService,
    private cartService: CartService,
    private router: Router
  ) {
    this.inventoryService.populatedList$.subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }

  ngOnInit() {
    // console.log(this.products);
  }

  addToCart(event) {
    console.log(event);
    this.cartService.addToCart(event);
  }

  removeFromCart(event) {
    console.log(event);
    this.cartService.removeFromCart(event);
  }
}
