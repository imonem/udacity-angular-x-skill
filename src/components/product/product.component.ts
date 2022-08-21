import { ActivatedRoute } from '@angular/router';
import {
	Component,
	Input,
	OnInit,
	Output,
	EventEmitter,
	Inject,
} from '@angular/core';
import { Product } from '../../models/product';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import {
	MatSnackBar,
	MatSnackBarRef,
	MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
	selector: 'product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	@Input() product: Product = null;
	@Output() addEvent: EventEmitter<Product> = new EventEmitter<Product>();
	@Output() removeEvent: EventEmitter<Product> = new EventEmitter<Product>();
	duration = 1500;

	private _snackRef: MatSnackBarRef<ProductComponent>;

	constructor(private route: ActivatedRoute, private _snackbar: MatSnackBar) {}

	ngOnInit() {}

	addToCart() {
		console.log(this.product.name);
		this.addEvent.emit(this.product);
	}

	removeFromCart() {
		console.log(this.product.name);
		this.removeEvent.emit(this.product);
	}
	//show alert and click handler to remove notification
	showAlert(product) {
		this._snackbar.open(`Added ${product.name}`, `Done`, {
			duration: this.duration,
			horizontalPosition: 'end',
		});
		let selectSnackBar = document.getElementsByClassName(
			'mat-snack-bar-container',
		);
		selectSnackBar
			.item(0)
			.addEventListener('click' || 'touch', () =>
				selectSnackBar.item(0).remove(),
			);
	}
}
