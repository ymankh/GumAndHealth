import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../../services/najlaa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-category-admin',
  templateUrl: './recipe-category-admin.component.html',
  styleUrls: ['./recipe-category-admin.component.css']
})
export class RecipeCategoryAdminComponent implements OnInit {
  recipeCategories: any[] = []; // استخدام 'any' بدلاً من واجهة معينة

  constructor(private najlaaService: NajlaaService, private router: Router) { }

  // تنفيذ عند تحميل الصفحة
  ngOnInit(): void {
    this.loadRecipeCategories(); // تحميل الفئات عند تهيئة المكون
  }

  // دالة لتحميل الفئات من الخدمة
  loadRecipeCategories() {
    this.najlaaService.getRecipeCategories().subscribe(categories => {
      this.recipeCategories = categories; // تخزين الفئات المسترجعة في المصفوفة
    });
  }

  // دالة لتعديل الفئة
  editCategory(id: number) {
    console.log(`Editing category with ID: ${id}`);
    this.router.navigate([`/recipe-category-admin-put/${id}`]); // الانتقال إلى صفحة التعديل
  }

  // دالة لإضافة فئة جديدة
  //addCategory() {
  //  this.router.navigate(['/PostRecipe']); // توجيه المستخدم إلى صفحة إضافة فئة جديدة
  //}

  // دالة لعرض تفاصيل الوصفة
  viewRecipe(id: number) {
    this.router.navigate([`/view-detiles-admin/${id}`]);
  }

  // دالة لتأكيد الحذف
  confirmDeleteCategory(categoryId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategory(categoryId);
      }
    });
  }

  // دالة لحذف الفئة
  deleteCategory(categoryId: number) {
    this.najlaaService.deleteCategory(categoryId).subscribe(
      (response) => {
        if (response.success) {
          // إزالة الفئة المحذوفة من القائمة
          this.recipeCategories = this.recipeCategories.filter(category => category.id !== categoryId);

          Swal.fire(
            'Deleted!',
            'Category has been deleted.',
            'success'
          );
        } else {
          Swal.fire(
            'Error!',
            response.message,
            'error'
          );
        }
      },
      (error) => {
        Swal.fire(
          'Error!',
          'An error occurred while deleting the category.',
          'error'
        );
      }
    );
  }
}
