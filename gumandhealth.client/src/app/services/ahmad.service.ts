import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root',
})
export class AhmadService {
  constructor(private http: HttpClient) { }
  

  addContact(data: any): Observable<any> {
    debugger
    return this.http.post<any>("https://localhost:44325/api/Contacts", data)
  }
  private apiUrl = "https://localhost:44325/api/";


  getClassById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}classCrud/getClass/${id}`);
  }

  updateClass(id: number, classItem: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}classCrud/putClass/${id}`, classItem, {
      headers: {
        'Content-Type': 'application/json-patch+json', // Ensure correct header
        'Accept': '*/*'
      }
    });
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}classCrud/deleteClass/${id}`);
  }

}
