import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
	selector: 'product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
	products: Product[];

	constructor(
		private inventoryService: InventoryService,
		private cartService: CartService,
	) {
		this.inventoryService.populatedList$.subscribe((response) => {
			this.products = response;
		});
	}

	ngOnInit() {}

	addToCart(event) {
		this.cartService.addToCart(event);
	}
}
