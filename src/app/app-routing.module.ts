import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../components/product/product.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { CartComponent } from '../components/cart/cart.component';
import { ConfirmationComponent } from 'src/components/confirmation/confirmation.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'products-list',
		pathMatch: 'full',
	},
	{ path: 'products-list', component: ProductListComponent },
	{
		path: 'product-details/:id',
		component: ProductDetailsComponent,
	},

	{ path: 'cart', component: CartComponent },
	{ path: 'order-confirmation', component: ConfirmationComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
