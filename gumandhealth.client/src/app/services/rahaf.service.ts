import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RahafService {

  constructor(private http: HttpClient) { }

  staticData = "https://localhost:7280/api";

  getAllClasses(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/GetAllClasses`);
  }

  getClassByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/GetClassByID?id=${id}`);
  }

  filter(name: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/filter?Name=${name}`);
  }

  getInstructorDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/getInstructorByclassID?id=${id}`);
  }

  getJadwal(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/GetAllClassSchedules`);
  }
  postCreatePayment(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Classes/checkout`,data)
  
   
  }
  executePayment(idSubs: number, paymentId: string, payerId: string, userID: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/success`, {
      params: {
        IdSubs: idSubs,
        paymentId: paymentId,
        PayerID: payerId,
        userID: userID
      }
    });
  }
  cancelPayment(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classes/cancel`);
  }



}
