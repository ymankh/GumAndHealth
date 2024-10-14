import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import iziToast from 'izitoast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent  {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    // Initialize the form with FormBuilder and a custom validator for matching passwords
    this.registerForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Method to handle the form submission
  onSubmit(): void {
    debugger;
    if (this.registerForm.valid) {
      const password = this.registerForm.get('password')?.value;

      // Call the register method in AuthService
      this.authService.passwordReset(password).subscribe(
        (response) => {
          iziToast.success({
            title: 'Password changed Successfully',
            message: 'Password changed Successfully!',
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          iziToast.error({
            title: 'Password reset Failed',
            message: 'There was an error resetting the password',
          });
          console.error('password error:', error);
        }
      );
    } else {
      // Mark all form controls as touched to show validation errors
      this.registerForm.markAllAsTouched();
    }
  }
}
