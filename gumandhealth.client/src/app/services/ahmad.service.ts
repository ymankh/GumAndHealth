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
}
