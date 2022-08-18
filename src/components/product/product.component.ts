import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = null;
  @Output() addEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() removeEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  addToCart() {
    console.log(this.product.name);
    this.addEvent.emit(this.product);
  }

  removeFromCart() {
    console.log(this.product.name);
    this.removeEvent.emit(this.product);
  }
}
