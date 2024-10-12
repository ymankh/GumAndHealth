import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  isLoading = false;
  resetError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      const { email } = this.resetForm.value;

      // Call the AuthService to handle the password reset
      this.authService.resetPassword(email).subscribe(
        (response) => {
          this.isLoading = false;
          console.log('Password reset email sent:', response);

          // Navigate to the login page after the reset email is sent
          this.router.navigate(['/login']);
        },
        (error) => {
          this.isLoading = false;
          this.resetError = 'Failed to send reset email. Please try again.';
          console.error('Reset password error:', error);
        }
      );
    } else {
      this.resetForm.markAllAsTouched();
    }
  }
}
