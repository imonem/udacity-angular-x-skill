import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
	selector: 'product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	@Input() product: Product = null;
	@Output() addEvent: EventEmitter<Product> = new EventEmitter<Product>();
	@Output() removeEvent: EventEmitter<Product> = new EventEmitter<Product>();

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {}

	addToCart() {
		this.addEvent.emit(this.product);
	}

	removeFromCart() {
		this.removeEvent.emit(this.product);
	}
}
