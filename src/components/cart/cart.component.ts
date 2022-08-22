import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { Customer } from '../../models/customer';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	@Input() color: ThemePalette;
	@Input() appearance: MatFormFieldAppearance;
	inCart: Product[] = [];
	inInventory: Product[] = [];
	cartTotal = 0;
	customer: Customer = { name: '', address: '', creditCard: null };
	formCustomerDetails: FormGroup;

	constructor(
		private cartService: CartService,
		private routerLink: Router,
		private builder: FormBuilder,
	) {}

	ngOnInit() {
		this.inCart = this.cartService.getCartItems();
		this.cartTotal = this.cartService.getCartTotal();
		this.formCustomerDetails = this.builder.group({
			name: [null, Validators.required],
			address: [null, Validators.required],
			creditCard: [null, Validators.required],
		});
	}

	getCartTotal() {
		this.cartTotal = this.cartService.getCartTotal();
		return this.cartTotal;
	}

	deleteFromCart(product) {
		this.cartService.deleteFromCart(product);
	}

	checkZero(product) {
		if (product.qty == 0) {
			this.deleteFromCart(product);
			this.getCartTotal();
		}
		return;
	}

	//Check if a cart is empty and return to product screen
	checkout() {
		if (this.inCart.length == 0) {
			this.routerLink.navigate(['/']);
			return window.alert(`Your cart is empty!`);
		}
		if (this.customer.name == '' || this.customer.address == '') {
			return window.alert(`Please fill in your details!`);
		}
		this.routerLink.navigate(['/order-confirmation']);
		this.cartService.setOrderDetails(this.customer, this.cartTotal);
		this.cartService.clearCart();
	}
}
