import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virify-otp',
  templateUrl: './virify-otp.component.html',
  styleUrls: ['./virify-otp.component.css']  // Kept the spelling as 'styleUrls'
})
export class VirifyOtpComponent implements OnInit {
  otpForm!: FormGroup;
  isLoading = false;
  resetError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize the form here
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const { otp } = this.otpForm.value;

      this.authService.virifyOtp(otp).subscribe(
        (response) => {
          this.isLoading = false;
          console.log('OTP virifyed successfully:', response);
          this.router.navigate(['/password-reset']);
        },
        (error) => {
          this.isLoading = false;
          this.resetError = 'Failed to virify OTP. Please try again.';
          console.error('Virify OTP error:', error);
        }
      );
    } else {
      this.otpForm.markAllAsTouched(); // Marks all controls as touched to show validation errors
    }
  }
}
