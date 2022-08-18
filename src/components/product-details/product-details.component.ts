import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../models/product';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId;
  product;
  @Output() addEvent: EventEmitter<Product> = new EventEmitter<Product>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: InventoryService
  ) {}

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = this.service.getOneItemForDetails(this.productId);
  }

  addToCart() {
    console.log(this.product.name);
    this.addEvent.emit(this.product);
  }
}
