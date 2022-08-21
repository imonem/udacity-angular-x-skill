import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier-updated';
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

	//Show styled non-blocking notfications instead of blocking alerts
	private readonly notifier: NotifierService;

	constructor(
		private inventoryService: InventoryService,
		private notifierService: NotifierService,
	) {
		this.inventoryService.populatedList$.subscribe((response) => {
			this.products = response;
		});
		this.notifier = notifierService;
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
		this.notifier.notify('success', `Added ${product.name} to cart`);
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
		this.notifier.notify('warning', `Removed all ${product.name} from cart`);
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
		this.notifier.notify('warning', `Cleared cart!!`);
	}

	//Setter for order details, that is shared with confirmation page
	setOrderDetails(customer: Customer, cartTotal: number) {
		this.orderDetails = { name: customer.name, total: cartTotal };
		this.notifier.notify('success', `Success! Thanks for shopping with us!`);
	}

	//Getter for order details, that is shared with confirmation page
	getOrderDetails() {
		return this.orderDetails;
	}

	//Get total item quantity in cart to reflect on the cart badge at nav bar
	getCartTotalQty() {
		let qty = 0;
		for (const p of this.cartItems) {
			qty += p.qty;
		}
		this.cartItemsCount$.next(qty);
	}
}
