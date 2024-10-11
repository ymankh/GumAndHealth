import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../services/najlaa.service'; // استيراد الخدمة

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipeCategories: any[] = []; // استخدام 'any' بدلاً من واجهة معينة

  constructor(private najlaaService: NajlaaService) { }

  // تنفيذ عند تحميل الصفحة
  ngOnInit(): void {
    this.najlaaService.getRecipeCategories().subscribe(categories => {
      this.recipeCategories = categories; // تخزين الفئات المسترجعة في المصفوفة
    });
  }

  // دالة لاستعراض التفاصيل (اختياري)
  viewRecipeDetails(id: number): void {
    console.log(`Viewing details for recipe category with ID: ${id}`);
  }
}
