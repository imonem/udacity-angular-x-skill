import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer';
import { CartService } from 'src/services/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
	orderDetails: Object = { name: '', sum: 0 };

	constructor(private cartService: CartService) {}

	ngOnInit() {
		this.orderDetails = this.cartService.getOrderDetails();
		console.log(this.orderDetails);
	}
}
