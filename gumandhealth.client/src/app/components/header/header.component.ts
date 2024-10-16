import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path according to your folder structure
import { CartService } from '../../services/cart.service';
import { NajlaaService } from '../../services/najlaa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router, public cartService: CartService, private najlaaService: NajlaaService) { }
  gyms: any[] = [];
  products: any;
  searchQuery: string = '';
  searchResults: any = null;


  performSearch() {
    if (this.searchQuery.trim()) {
      this.najlaaService.search(this.searchQuery).subscribe(results => {
        this.searchResults = results;
        console.log("searchResults", this.searchResults);  // تحقق من ظهور النتائج في Console
        this.showResults();  // عرض النتائج باستخدام SweetAlert
      }, error => {
        console.error('Error fetching search results:', error);
      });
    } else {
      Swal.fire('Please enter a search query', '', 'warning');
    }
  }
  showResults() {
    if (this.searchResults) {
      let htmlContent = '';

      // فحص البيانات وإضافة العناوين فقط في حال وجود بيانات
      if (this.searchResults.classServices && this.searchResults.classServices.length > 0) {
        htmlContent += `<h5>Class Services</h5><ul>`;
        this.searchResults.classServices.forEach((service: any) => {
          htmlContent += `
          <li>
            <strong>${service.name}</strong>: ${service.pricePerMonth}
            <button class="btn btn-success btn-sm" onclick="window.location.href='/ClassDetails/${service.id}'">View Service</button>
          </li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.searchResults.gymServices && this.searchResults.gymServices.length > 0) {
        htmlContent += `<h5>Gym Services</h5><ul>`;
        this.searchResults.gymServices.forEach((service: any) => {
          htmlContent += `
          <li>
            <strong>${service.name}</strong>: ${service.description} <strong>${service.pricePerMonth}</strong>
            <button class="btn btn-success btn-sm" onclick="window.location.href='/gym/${service.id}'">View Service</button>
          </li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.products && this.searchResults.products.length > 0) {
        htmlContent += `<h5>Products</h5><ul>`;
        this.searchResults.products.forEach((product: any) => {
          htmlContent += `
          <li>
            <strong>${product.name}</strong>: ${product.price} JD
            <button class="btn btn-success btn-sm" onclick="window.location.href='/products/${product.id}'">View Product</button>
          </li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.searchResults.recipes && this.searchResults.recipes.length > 0) {
        htmlContent += `<h5>Recipes</h5><ul>`;
        this.searchResults.recipes.forEach((recipe: any) => {
          console.log("recipe", recipe);

          htmlContent += `
          <li>
            <strong>${recipe.name}</strong>: ${recipe.description}
            <button class="btn btn-success btn-sm" onclick="window.location.href='/recipes1/${recipe.id}'">View Recipe</button>
          </li>`;
        });
        htmlContent += `</ul>`;
      }

      // إذا لم تكن هناك نتائج لعرضها
      if (!htmlContent) {
        htmlContent = '<p>No results found.</p>';
      }

      // عرض النتائج باستخدام SweetAlert
      Swal.fire({
        title: 'Search Results',
        html: htmlContent,
        icon: 'info',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Close'
      });
    }
  }


  ngOnInit(): void {

    this.najlaaService.getProducts().subscribe((data: any) => {
      this.products = data; // الحصول على بيانات المنتجات
    });
    this.najlaaService.getGyms().subscribe((data: any[]) => {
      this.gyms = data; // الحصول على بيانات الصالات
    });
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
  shouldShowSearch(): boolean {
    // تحديد الصفحات التي تريد إخفاء أو إظهار البحث فيها
    const hiddenRoutes = ['/admin', '/login', '/profile', '/reset-password', '/cart', '/register', '/about', '/contact', '/password-reset', '/admin-login', '/virifyOtp', '/reset-password', '/classes','/class-details/:id']; // صفحات لا نريد إظهار البحث فيها
    return !hiddenRoutes.includes(this.router.url); // يظهر البحث إذا لم تكن الصفحة الحالية ضمن القائمة
  }

 
 
  




  isAdminPage(): boolean {
    // Returns true if the current URL contains 'admin'
    return this.router.url.includes('/admin');
  }
}
