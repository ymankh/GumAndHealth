import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { root } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AhmadService {
  constructor(private http: HttpClient) {}
}
