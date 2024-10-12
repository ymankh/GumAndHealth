import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { root } from '../shared/constants';
import iziToast from 'izitoast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to track login status
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Expose the BehaviorSubject as an observable
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in by checking the localStorage token
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedInSubject.next(true); // Set logged-in state if token is found
    }
  }

  // Method to log in a user
  login(email: string, password: string): Observable<void> {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);

    return new Observable<void>((observer) => {
      this.http
        .post<{ token: string }>(`${root}/api/Auth/login`, formData)
        .subscribe(
          (response) => {
            // Save token to localStorage
            localStorage.setItem('token', response.token);

            // Success toast notification
            iziToast.success({
              title: 'Login Successful',
              message: 'You are now logged in',
            });

            // Update login state
            this.isLoggedInSubject.next(true);

            // Notify subscribers of success
            observer.next();
            observer.complete();
          },
          (error) => {
            // Failure toast notification
            iziToast.error({
              title: 'Login Failed',
              message: 'Invalid email or password',
            });
            console.error('Login error:', error);

            // Notify subscribers of the error
            observer.error(error);
          }
        );
    });
  }

  // Method to log out the user
  logout(): void {
    // Clear login state and token from localStorage
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('token');

    // Logout notification
    iziToast.info({
      title: 'Logout Successful',
      message: 'You are now logged out',
    });
  }

  // Method to check if the user is currently logged in
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  // Method to register a new user
  register(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);

    // Post registration data to the backend
    return this.http.post<any>(`${root}/api/Auth/register`, formData);
  }

  // Method to reset password
  resetPassword(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);

    // Make an HTTP POST request to your backend API for password reset
    return this.http.post<any>(`${root}/api/Auth/reset-password`, formData);
  }

  // Method to fetch data from an API
  fetchData(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }
}
