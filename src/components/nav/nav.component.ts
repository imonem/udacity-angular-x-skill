import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ThemePalette } from '@angular/material/core';

@Component({
	selector: 'anav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	@Input()
	color: ThemePalette;

	cartTotalBadge: number;
	constructor(private cartService: CartService) {
		this.cartService.cartQty$.subscribe((res) => {
			this.cartTotalBadge = res;
			console.log(res);
		});
	}

	ngOnInit() {
		console.log(this.cartTotalBadge);
	}
}
