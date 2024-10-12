import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { root } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})

export class RawaahService {

  private baseUrl = 'https://localhost:7280/api';

  constructor(private http: HttpClient) { }

  // مشان اجيبها معرف البروفايل
  private get headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
      // لا تضيف Content-Type هنا عند استخدام FormData
    });
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/UserProfile/${userId}`, { headers: this.headers });
  }

  updateUserProfile(userId: number, updatedData: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/UserProfile/UpdateUserProfile${userId}`, updatedData);
  }


  // جلب الطلبات
  getUserOrders(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/UserProfile/GetAllOrders/${userId}`);
  }

  // جلب الاشتراكات
  getUserSubscriptions(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/UserProfile/GetAllSubscription/${userId}`);
  }
}
//updateUserProfile(userId: number, updatedData: any): Observable < void> {
//  return this.http.put<void>(`${this.baseUrl}/UserProfile/UpdateUserProfile${userId}`, updatedData, { headers: this.headers });
//}
//}




