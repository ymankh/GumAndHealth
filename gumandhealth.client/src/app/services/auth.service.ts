import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
        // Handle login error (e.g., display error message)
        console.error(error);
      }
    );

    // Save login status in localStorage (for persistence)
    localStorage.setItem('isLoggedIn', 'true');
  }

  // Method to log out a user
  logout(): void {
    // Perform logout logic (e.g., clear user data, invalidate session)
    this.isLoggedInSubject.next(false);

    // Remove login status from localStorage
    localStorage.removeItem('isLoggedIn');
  }

  // Method to get the current login state (useful for components needing immediate access)
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }
}
