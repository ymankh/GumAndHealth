import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Correct import for Observable

@Injectable({
  providedIn: 'root'
})
export class NajlaaService {

  private apiUrl = 'https://localhost:7280/api/RecipeCategory'; // Adjust URL if needed

  constructor(private http: HttpClient) { }

  // Get all recipe categories
  getRecipeCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a specific recipe category by ID
  getRecipeCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

 
  getRecipeById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7280/api/Recipe/GetRecipesByCategory?recipeCategoryId=${id}`);
  }

}
