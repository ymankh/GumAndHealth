import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { root } from '../shared/constants';
import iziToast from 'izitoast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Create a BehaviorSubject with initial login status (false means not logged in)
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Expose the BehaviorSubject as an observable so components can subscribe to it
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(readonly http: HttpClient) {
    // Optionally check if the user is already logged in (e.g., from localStorage)
    const storedLoginStatus = localStorage.getItem('token');
    if (storedLoginStatus) {
      this.isLoggedInSubject.next(true); // Set initial state to logged in if found in localStorage
    }
  }

  // Method to log in a user
  login(email: string, password: string): void {
    let formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);
    this.http.post<{ token: string }>(root + '/api/Auth/login', formData).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        iziToast.success({
          title: 'Login Successful',
          message: 'You are now logged in',
        });
        this.isLoggedInSubject.next(true);
      },
      (error) => {
        iziToast.error({
          title: 'Login Failed',
          message: 'Invalid email or password',
        });
        console.error(error);
      }
    );

    localStorage.setItem('isLoggedIn', 'true');
  }

  // Method to log out a user
  logout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
  }

  // Method to get the current login state
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  // Method to register a new user
  register(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);

    // Post registration data to backend
    return this.http.post<any>(root + '/api/Auth/register', formData);
  }

  // Method to fetch data from an API
  fetchData(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl);
  }
}
