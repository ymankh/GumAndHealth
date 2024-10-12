import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Define loginForm
  isLoading = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder, // FormBuilder to create form
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
    // Initialize the form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Handle login logic here
      this.isLoading = true; // Show spinner when loading
      // Mock login process for now
      setTimeout(() => {
        this.isLoading = false;
        console.log('Login successful');
        this.router.navigate(['/profile']); // Navigate to profile after login
      }, 1500);
    }
  }

  navigateToRegister(): void {
    debugger;
    this.router.navigate(['/register']); // Navigate to register route
  }

  navigateToResetPassword(): void {
    this.router.navigate(['/reset-password']); // Navigate to reset password route
  }
}
