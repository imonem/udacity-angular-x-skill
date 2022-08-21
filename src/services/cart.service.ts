import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Customer } from 'src/models/customer';
import { Product } from '../models/product';
import { InventoryService } from './inventory.service';

@Injectable()
export class CartService {
	cartItems: Product[] = [];
	cartTotal = 0;
	cartItemsCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	cartQty$ = this.cartItemsCount$.asObservable();
	products: Product[];
	orderDetails: Object = {};
	MAT_SNA;

	constructor(
		private inventoryService: InventoryService,
		private _snackbar: MatSnackBar,
	) {
		this.inventoryService.populatedList$.subscribe((response) => {
			// console.log(response);
			this.products = response;
		});
	}

	addToCart(product: Product) {
		//Condition to increase product cart quantity instead of removing element from cart array
		if (
			this.cartItems.find((p) => p.id == product.id) &&
			this.products.find((i) => i.stock > 0)
		) {
			let index = this.products.indexOf(product);
			this.products[index].stock--;
			this.cartItems.find((product) => product.qty++);
			this.cartTotal = this.getCartTotal();
		} else {
			if (this.products.find((i) => i.stock > 0 && i.id == product.id)) {
				let index = this.products.indexOf(product);
				this.products[index].stock--;
				this.products[index].qty++;
				this.cartItems.push(product);
				this.cartTotal = this.getCartTotal();
			}
		}
		this.getCartTotalQty();
		// window.alert('product added');
		// this._snackbar.open(`Added ${product.name} to cart`, 'x', {
		// 	duration: 1000,
		// });
		// this._snackbar.dismiss();
		console.log(this.products);
		console.log(this.cartItems);
	}

	removeOneFromCart(product: Product) {
		//Condition to decrease product cart quantity instead of removing element from cart array
		if (this.cartItems.find((p) => p.id == product.id)) {
			let index = this.products.indexOf(product);
			this.products[index].stock++;
			this.cartItems.find((product) => product.qty--);
			this.cartTotal = this.getCartTotal();
		} else {
			if (this.products.find((i) => i.stock > 0 && i.id == product.id)) {
				let index = this.products.indexOf(product);
				this.products[index].stock++;
				this.products[index].qty--;
				this.cartItems.push(product);
				this.cartTotal = this.getCartTotal();
			}
		}
		this.getCartTotalQty();
		// window.alert('product removed');
		this._snackbar.open(`Removed ${product.name} to cart`, 'x', {
			duration: 2500,
		});
		console.log(this.products);
		console.log(this.cartItems);
	}

	deleteFromCart(product) {
		//Remove item from cart array
		let index = this.cartItems.indexOf(product);
		this.cartItems.splice(index, 1);

		//return inventory stock
		this.products.find((p) => p.id == product.id).qty = 0;
		this.products.find((p) => p.id == product.id).stock = 10;

		//Update cart total to reflect change
		this.getCartTotalQty();
		this.getCartTotal();
		// window.alert('Removed from cart');
		this._snackbar.open(`Removed all of the ${product.name} from cart`, 'x');
	}

	getCartItems() {
		this.getCartTotalQty();
		return this.cartItems;
	}

	getCartTotal() {
		let total = 0;
		for (const product of this.cartItems) {
			total += product.qty * product.price;
		}
		this.getCartTotalQty();
		return total;
	}

	clearCart() {
		this.cartItems = [];
		this.getCartTotalQty();
		this.products.map((p) => (p.qty = 0));
	}

	setOrderDetails(customer: Customer, cartTotal: number) {
		this.orderDetails = { name: customer.name, total: cartTotal };
	}

	getOrderDetails() {
		console.log(this.orderDetails);
		return this.orderDetails;
	}

	//Get total item quantity in cart to reflect on the badge
	getCartTotalQty() {
		let qty = 0;
		for (const p of this.cartItems) {
			qty += p.qty;
		}
		this.cartItemsCount$.next(qty);
	}
}
