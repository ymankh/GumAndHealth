import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FawarehService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  staticUrl = "https://localhost:7280/api"



  ///////////////// get All Gyms Service /////////////////
  getAllGyms(): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gyms/GetAllGyms`)
  }


  ///////////////// for single gym /////////////////
  getSignleGym(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gyms/GetGymById/${id}`)
  }

  addGymSubscription(data: any): Observable<any> { 
    return this.http.post<any>(`${this.staticUrl}/GymsSubscription/AddNewGymSubscription`, data)


  }








}
