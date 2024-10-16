import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent {

  constructor(private router: Router) { }

  // دالة التوجيه
  navigateToRecipes(categoryId: number): void {
    if (categoryId === 1) {
      this.router.navigate(['nutrition/tips']);
    } else if (categoryId === 2) {
      // التوجيه إلى صفحة الوصفات
      this.router.navigate(['/recipescateory']);
    }
  }
}
