import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/interfaces'; // Import the Product interface
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(readonly http: HttpClient) { }

  // Method to get all products (still returning a paged result if your API supports pagination)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/products`); // Assuming this returns an array of products
  }

  // Method to get products by category ID (returning just Product[])
  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/products/category/${categoryId}`); // Assuming this endpoint returns an array of products
  }


  

  // Fetch products by price range
  getProductsByPriceRange(minPrice: number, maxPrice: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/products/ByPriceRange?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }
}
