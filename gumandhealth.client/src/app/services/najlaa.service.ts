import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Correct import for Observable

@Injectable({
  providedIn: 'root'
})
export class NajlaaService {

  private apiUrl = 'https://localhost:7280/api/RecipeCategory'; // Adjust URL if needed
  private apiUrl1 = 'https://localhost:7280/api/Home/search';

  constructor(private http: HttpClient) { }

  // Get all recipe categories
  getRecipeCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  // دالة لإرسال التصنيف الجديد إلى الـ API
  postRecipeCategory(formData: FormData): Observable<any> {
    return this.http.post(`https://localhost:7280/api/RecipeCategory/api/RecipeCategory`, formData);
  }
  addRecipe(formData: FormData): Observable<any> {
    return this.http.post(`https://localhost:7280/api/Recipe/AddRecipe`, formData);
  }
  // Get a specific recipe category by ID
  getRecipeCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  search(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl1}?query=${query}`);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`/${id}`);
  }
  getRecipeById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7280/api/Recipe/GetRecipeByCategory?recipeCategoryId=${id}`);
  }
  getGyms(): Observable<any> {
    return this.http.get<any>("https://localhost:7280/api/Home/GetAllGyms");
  }
  getProducts(): Observable<any> {
    return this.http.get<any>("https://localhost:7280/api/Home");
  }
}
