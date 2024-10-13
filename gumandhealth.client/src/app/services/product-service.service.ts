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
  // Method to fetch all products when 'All Categories' is selected
getAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${root}/api/Products/AllProducts`);
}


  // Method to get products by category ID (this filters products by the selected category)
  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/Products/category/${categoryId}`); // Ensure the URL matches backend routing
  }

  // Method to get all products (if no category is selected, this returns all products)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/Products`); // General endpoint to fetch all products
  }


  getProductsByPriceRange(minPrice: number, maxPrice: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${root}/api/Products/ByPriceRange?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }

  // Method to fetch all categories (fetches all available categories from the backend)
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${root}/api/Products/AllCategories`); // Ensure URL matches the backend's category endpoint
  }


  createProduct(product: Product): Observable<Product> {
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());

    // Check if image exists and only append if it is not undefined
    if (product.image1) {
      formData.append('image', product.image1); // Adjust this if you're using image blobs
    }

    return this.http.post<Product>(`${root}/api/Products`, formData);
  }


  updateProduct(id: number, product: Product): Observable<Product> {
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());

    // Check if image exists and only append if it is not undefined
    if (product.image1) {
      formData.append('image', product.image1); // Adjust accordingly if you're using image blobs
    }

    return this.http.put<Product>(`${root}/api/Products/${id}`, formData);
  }

  // Delete product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${root}/api/Products/${id}`);
  }
}
