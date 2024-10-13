import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path according to your folder structure
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router, public cartService: CartService) { }

  ngOnInit(): void {
     //Subscribe to login status from AuthService
    this.authService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
  // Handle logout functionality
  onLogout(): void {
    this.authService.logout(); // Call logout from the service
    this.router.navigate(['/']); // Redirect to the login page after logout
  }
}
