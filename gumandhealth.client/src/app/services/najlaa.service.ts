import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; // Correct import for Observable

@Injectable({
  providedIn: 'root'
})
export class NajlaaService {

  private apiUrl = 'https://localhost:7280/api/RecipeCategory'; // Adjust URL if needed
  private apiUrl1 = 'https://localhost:7280/api/Home/search';

  constructor(private http: HttpClient) { }
  putRecipeCategory(id: string, formData: FormData) {
    return this.http.put(`https://localhost:7280/api/RecipeCategory/api/RecipeCategory/${id}`, formData);
  }
  getRecipeCategoryput(id: string) {
    return this.http.get(`https://localhost:7280/api/RecipeCategory/${id}`);
  }
  // تحديث وصفة موجودة
  updateRecipe(id: number, recipeData: FormData): Observable<any> {
    return this.http.put<any>(`https://localhost:7280/api/Recipe/api/Recipe/${id}`, recipeData);
  }
  // Get all recipe categories
  getRecipeCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteCategory(id: number) {
    return this.http.delete<{ success: boolean, message: string }>(`https://localhost:7280/api/RecipeCategory/${id}`);
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
 
  getRecipeById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7280/api/Recipe/GetRecipeByCategory?recipeCategoryId=${id}`);
  }
  getGyms(): Observable<any> {
    return this.http.get<any>("https://localhost:7280/api/Home/GetAllGyms");
  }
  getProducts(): Observable<any> {
    return this.http.get<any>("https://localhost:7280/api/Home");
  }





  private apiUrl12 = 'https://localhost:7280/api/order'; 


  // دالة لجلب جميع الطلبات
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl12}/orders`);
  }

  // دالة للبحث عن الطلبات بناءً على الشروط (اسم المستخدم، تاريخ الطلب، أو اسم المنتج)
  searchOrders(userName?: string, orderDate?: string, productName?: string): Observable<any> {
    let params = new HttpParams();
    if (userName) {
      params = params.append('userName', userName);
    }
    if (orderDate) {
      params = params.append('orderDate', orderDate);
    }
    if (productName) {
      params = params.append('productName', productName);
    }

    return this.http.get(`${this.apiUrl12}/search-orders`, { params });
  }


}
