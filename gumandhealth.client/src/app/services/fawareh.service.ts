import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FawarehService {

  constructor(private http: HttpClient) { }

  staticUrl = "https://localhost:44325/api"



  //get All Gyms Service
  getAllGyms(): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gyms/GetAllGyms`)
  }










}
