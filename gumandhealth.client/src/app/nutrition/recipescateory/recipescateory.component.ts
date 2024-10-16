import { Component } from '@angular/core';
import { NajlaaService } from '../../services/najlaa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipescateory',
  templateUrl: './recipescateory.component.html',
  styleUrl: './recipescateory.component.css'
})
export class RecipescateoryComponent {
  recipeCategories: any[] = []; // استخدام 'any' بدلاً من واجهة معينة

  constructor(private najlaaService: NajlaaService, private router: Router) { } // إضافة Router

  // تنفيذ عند تحميل الصفحة
  ngOnInit(): void {
    this.najlaaService.getRecipeCategories().subscribe(categories => {
      this.recipeCategories = categories; // تخزين الفئات المسترجعة في المصفوفة
    });
  }

  // دالة لاستعراض التفاصيل (اختياري)
  viewRecipeDetails(id: number): void {
    this.router.navigate(['recipes', id]); // استخدام Router للانتقال إلى صفحة التفاصيل
  }
}
