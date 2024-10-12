import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RahafService {

  constructor(private http: HttpClient) { }

  staticData = "https://localhost:7280/api"


  getAllClasses(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/GetAllClasses`)
  }
  getClassByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/GetClassByID?id=${id}`)
  }
  filter(name: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/filter?Name=${name}`)
  }
  getInstructorDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/getInstructorByclassID?id=${id}`)
  }

  getJadwal(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/GetAllClassSchedules`)
  }

  postPayment(body: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Classes/api/Subscription/JoinClass`, body);
  }


}
