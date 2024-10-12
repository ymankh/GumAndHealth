import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import iziToast from 'izitoast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    // Initialize the form with FormBuilder
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // Method to handle the form submission
  onSubmit(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      // Call the register method in AuthService
      this.authService.register(email, password).subscribe(
        (response) => {
           iziToast.success({
            title: 'Registration Successful',
            message: 'You have been registered successfully!',
          });
          // Optionally, navigate the user to another page, like the login page
        },
        (error) => {
          iziToast.error({
            title: 'Registration Failed',
            message: 'There was an error registering the user',
          });
          console.error('Registration error:', error);
        }
      );
    } else {
      iziToast.error({
        title: 'Form Error',
        message: 'Please fill out all required fields correctly',
      });
    }
  }
}
