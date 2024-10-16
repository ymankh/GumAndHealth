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

  staticUrl = "https://localhost:44325/api" 


  ///////////////// get All Gyms Service /////////////////
  getAllGyms(): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gyms/GetAllGyms`)
  }


  ///////////////// for single gym /////////////////
  getSignleGym(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gyms/GetGymById/${id}`)
  }

  addGymSubscription(data: any): Observable<any> {
    if (!this.auth.isUserLoggedIn()) {
      throw new Error ("You have to login first")
    }
    return this.http.post<any>(`${this.staticUrl}/GymsSubscription/AddNewGymSubscription`, data, { headers: this.auth.headers()})


  }



  ///////// Classes Admin Side /////////

  getAllClasses(): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/allClasses/GetAllClasses1`)
  }


  getSignleClass(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/allClasses/GetClassesByID?id=${id}`)
  }




  /////// Edit Classes Admin Side ////


 editClass(id: any, data: any): Observable<any> {
   return this.http.put(`${this.staticUrl}/allClasses/UpdateClassService/${id}`, data)

  }

  



  /////// Add Classes Admin Side ////

  addClass(data: any): Observable<any> {
    return this.http.post(`${this.staticUrl}/allClasses/AddNewClassService`, data)

  }



  /// Delete Class Admin Side //////////
  private apiUrl = 'https://localhost:44325/api/allClasses'; // Base URL

  deleteClassService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteClassService/${id}`);
  }







}
