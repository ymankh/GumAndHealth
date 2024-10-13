import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private baseUrl = 'https://localhost:7280/api'; // عنوان الـ API

  constructor(private http: HttpClient) { }

  // دالة لجلب بيانات المدربين
  getInstructors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Instructor`); // جلب البيانات وإرجاع Observable
  }

  // دالة لإضافة مدرب جديد
  addInstructor(instructorData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Instructor`, instructorData); // إرسال البيانات إلى الـ API
  }

  // دالة لتحديث بيانات مدرب
  updateInstructor(instructorId: number, instructorData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Instructor/${instructorId}`, instructorData); // تحديث البيانات
  }

  // دالة لحذف مدرب
  deleteInstructor(instructorId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Instructor/${instructorId}`); // حذف المدرب
  }
}

