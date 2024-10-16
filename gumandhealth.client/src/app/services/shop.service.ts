import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../types/category.model';  // Adjust the path based on your folder structure


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = 'https://localhost:44325/api/Categories';  // Adjust this to your actual API endpoint

  constructor(private http: HttpClient) { }

  // Method to get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
