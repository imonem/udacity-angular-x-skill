import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private productList: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([] as any);
  populatedList$ = this.productList.asObservable();
  __JSONURL = '../../assets/data.json';

  constructor(private http: HttpClient) {
    this.getInventory().subscribe((response: Product[]) => {
      this.productList.next(response);
    });
  }
  private getInventory(): Observable<Product[]> {
    return this.http.get<Product[]>(this.__JSONURL);
  }

  getPopulatedList(): Observable<Product[]> {
    return this.populatedList$;
  }

  getOneItemForDetails(id): any {
    let fetchedItem: Product;
    let oneItem$ = this.populatedList$.pipe(
      map((x) => x.find((p) => p.id == id))
    );
    oneItem$.subscribe((x) => (fetchedItem = x));
    console.log(fetchedItem);
    return fetchedItem;
  }
}
