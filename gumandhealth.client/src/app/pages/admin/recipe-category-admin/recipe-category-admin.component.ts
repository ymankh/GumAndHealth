import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../../services/najlaa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-category-admin',
  templateUrl: './recipe-category-admin.component.html',
  styleUrls: ['./recipe-category-admin.component.css']
})
export class RecipeCategoryAdminComponent implements OnInit {
  recipeCategories: any[] = []; // استخدام 'any' بدلاً من واجهة معينة

  constructor(private najlaaService: NajlaaService, private router: Router) { } // إضافة Router

  // تنفيذ عند تحميل الصفحة
  ngOnInit(): void {
    this.najlaaService.getRecipeCategories().subscribe(categories => {
      this.recipeCategories = categories; // تخزين الفئات المسترجعة في المصفوفة
    });
  }

  // دالة لتعديل الفئة
  editCategory(id: number) {
    console.log(`Editing category with ID: ${id}`);
    this.router.navigate([`/recipe-category-admin-put/${id}`]); // الانتقال إلى صفحة التعديل
  }
  addCategory() {
    // توجيه المستخدم إلى صفحة إضافة فئة جديدة
    this.router.navigate(['/PostRecipe']);
  }
  viewRecipe(id: number) {
    this.router.navigate([`/view-detiles-admin/${id}`]); 

  }
  // دالة لحذف الفئة
  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.najlaaService.deleteCategory(id).subscribe(() => {
        console.log(`Category with ID: ${id} deleted`);
        // إعادة تحميل الفئات بعد الحذف
        this.recipeCategories = this.recipeCategories.filter(category => category.id !== id);
      }, (error: any) => {
        console.error('Error deleting category:', error);
      });
    }
  }
}
