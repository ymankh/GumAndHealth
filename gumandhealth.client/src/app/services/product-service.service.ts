import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Product, ProductPagedResult } from '../shared/interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(readonly http: HttpClient) {}
  getProducts(): Observable<ProductPagedResult> {
    return this.http.get<ProductPagedResult>(`${root}/api/products`);
  }
}
