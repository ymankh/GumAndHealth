import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsRRService {


  constructor(private http: HttpClient) { }
  staticData = "https://localhost:44325/api";

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/AllProductsNew`);
  }
 
  getProductByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/GetProductByIdNew/${id}`);
  }

  updateProducts(id: number, updatedData: any): Observable<void> {
    return this.http.put<void>(`${this.staticData}/Products/UpdateProductNew/${id}`, updatedData);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.staticData}/Products/${id}`)
  }
}




