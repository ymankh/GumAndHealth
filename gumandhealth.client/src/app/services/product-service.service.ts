import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Product, Category } from '../shared/interfaces'; // Import Product and Category interfaces
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(readonly http: HttpClient) { }

  // Method to get all products (this should retrieve all products by default)
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/Products/AllProducts`);
  }

  // Method to get products by category ID (this filters products by the selected category)
  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/Products/category/${categoryId}`);
  }

  // Method to get products by price range
  getProductsByPriceRange(minPrice: number, maxPrice: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/Products/ByPriceRange?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }

  // Method to fetch all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${root}/api/Products/AllCategories`);
  }

  // Method to create a new product with image
  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${root}/api/Products/AddProduct`, formData);
  }

  // Method to update an existing product with image
  updateProduct(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${root}/api/Products/${id}`, formData);
  }

  // Method to delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${root}/api/Products/${id}`);
  }
}
