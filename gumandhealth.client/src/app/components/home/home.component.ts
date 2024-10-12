import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../services/najlaa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // تم تصحيح اسم الخاصية styleUrl إلى styleUrls
})
export class HomeComponent implements OnInit {

  gyms: any[] = [];
  products: any;
  searchQuery: string = '';
  searchResults: any = null;

  constructor(private najlaaService: NajlaaService) { }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.najlaaService.search(this.searchQuery).subscribe(results => {
        this.searchResults = results;
        console.log("searchResults",this.searchResults);  // تحقق من ظهور النتائج في Console
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
          htmlContent += `<li><strong>${service.name}</strong>: ${service.pricePerMonth}</li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.searchResults.gymServices && this.searchResults.gymServices.length > 0) {
        htmlContent += `<h5>Gym Services</h5><ul>`;
        this.searchResults.gymServices.forEach((service: any) => {
          htmlContent += `<li><strong>${service.name}</strong>: ${service.description}<strong>${service.pricePerMonth}</strong></li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.products && this.searchResults.products.length > 0) {
        htmlContent += `<h5>Products</h5><ul>`;
        this.searchResults.products.forEach((product: any) => {
          htmlContent += `<li><strong>${product.name}</strong>: ${product.price} JD</li>`;
        });
        htmlContent += `</ul>`;
      }

      if (this.searchResults.recipes && this.searchResults.recipes.length > 0) {
        htmlContent += `<h5>Recipes</h5><ul>`;
        this.searchResults.recipes.forEach((recipe: any) => {
          htmlContent += `<li><strong>${recipe.name}</strong>: ${recipe.description}</li>`;
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


  // تحميل البيانات عند بدء تشغيل المكون
  ngOnInit() {
    this.najlaaService.getProducts().subscribe((data: any) => {
      this.products = data; // الحصول على بيانات المنتجات
    });
    this.najlaaService.getGyms().subscribe((data: any[]) => {
      this.gyms = data; // الحصول على بيانات الصالات
    });
  }
}
