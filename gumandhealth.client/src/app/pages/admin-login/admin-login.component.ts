import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HosamService } from '../../services/hosam.service'; // Ensure the correct path

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hosamService: HosamService // Inject AuthService for handling login
  ) { }

  ngOnInit(): void {
    // Initialize the form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Using async/await to handle login logic
  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading = true; // Show spinner when loading

      const { email, password } = this.loginForm.value;

      try {
        // Await login process through AuthService
        await this.hosamService.login(email, password).toPromise();

        this.isLoading = false;
        this.loginError = ''; // Clear error message

        // Navigate to profile page after successful login
        this.router.navigate(['/Dashboard']);
      } catch (error) {
        // Handle login error and show the message
        this.isLoading = false;
        this.loginError = 'Login failed. Please check your credentials.';
      }
    } else {
      // Mark all fields as touched to trigger validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']); // Navigate to register route
  }

  navigateToResetPassword(): void {
    this.router.navigate(['/reset-password']); // Navigate to reset password route
  }
}

