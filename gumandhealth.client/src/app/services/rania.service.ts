import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category.model'; // Adjust the path accordingly

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = '/api/Categories'; // Adjust this to your actual API endpoint

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
