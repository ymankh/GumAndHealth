import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../services/najlaa.service'; // استيراد الخدمة
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  allrecipes: any[] = []; // لتخزين قائمة الوصفات
  recipeCategoryId: number | null | undefined; // لتخزين معرف الفئة

  constructor(
    private route: ActivatedRoute,
    private router: Router, // لاستخدام التوجيه بين الصفحات
    private najlaaService: NajlaaService // لاستدعاء الـ API
  ) { }

  ngOnInit(): void {
    // الحصول على معرف الفئة من المسار
    const categoryId = this.route.snapshot.paramMap.get('id');

    // إذا كان هناك معرف فئة صالح، تحميل الوصفات المتعلقة بها
    if (categoryId) {
      this.recipeCategoryId = +categoryId; // تحويل القيمة إلى عدد
      this.loadRecipesByCategory(this.recipeCategoryId);
    } else {
      console.error('No recipe category ID found in route parameters.');
    }
  }

  // تحميل الوصفات حسب معرف الفئة
  loadRecipesByCategory(categoryId: number): void {
    this.najlaaService.getRecipesByCategory(categoryId).subscribe(
      recipes => {
        this.allrecipes = recipes; // تخزين الوصفات المسترجعة
      },
      error => {
        console.error('Error fetching recipes:', error); // في حالة وجود خطأ
      }
    );
  }

  // الانتقال إلى صفحة تفاصيل الوصفة
  viewRecipeDetails(id: number): void {
    this.router.navigate(['recipes1', id]); // الانتقال لصفحة الوصفة المحددة
  }
}
