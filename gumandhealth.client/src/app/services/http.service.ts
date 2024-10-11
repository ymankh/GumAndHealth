import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(readonly http: HttpClient) {}
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/RecipeCategory');
  }
}
