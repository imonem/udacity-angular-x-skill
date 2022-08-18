import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { InventoryService } from '../services/inventory.service';
import { NavComponent } from '../components/nav/nav.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CartService } from '../services/cart.service';
import { CartComponent } from '../components/cart/cart.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    NavComponent,
    FooterComponent,
    CartComponent,
    ConfirmationComponent,
  ],
  providers: [InventoryService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
