import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../../services/najlaa.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-category-admin-put',
  templateUrl: './recipe-category-admin-put.component.html',
  styleUrls: ['./recipe-category-admin-put.component.css']
})
export class RecipeCategoryAdminPutComponent implements OnInit {
  recipeCategory = {
    name: '',
    description: '',
    imagePath: '' // هنا تخزين رابط الصورة
  };
  selectedFile: File | null = null;
  categoryId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private najlaaService: NajlaaService,
    private router: Router
  ) { }

  // استدعاء البيانات عند تحميل الصفحة
  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');

    if (this.categoryId) {
      // جلب البيانات القديمة باستخدام الـ ID
      this.najlaaService.getRecipeCategoryput(this.categoryId).subscribe(
        (data: any) => {
          this.recipeCategory.name = data.name;
          this.recipeCategory.description = data.description;
          this.recipeCategory.imagePath = data.imagePath; // حفظ رابط الصورة
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Unable to load category data.',
          });
        }
      );
    }
  }

  // دالة لاختيار الصورة
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // دالة لإرسال البيانات
  onSubmit() {
    if (this.categoryId && (this.recipeCategory.name && this.recipeCategory.description)) {
      const formData = new FormData();
      formData.append('name', this.recipeCategory.name);
      formData.append('description', this.recipeCategory.description);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // استخدام PUT لتحديث البيانات
      this.najlaaService.putRecipeCategory(this.categoryId, formData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Category updated successfully!',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/recipe-category-admin']); // إعادة التوجيه
          });
        },
        (error: any) => {
          console.error('Error details:', error); // عرض تفاصيل الخطأ
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while updating the category.',
          });
        }
      );
    }
  }

  // دالة للحصول على رابط الصورة الحالية
  getCurrentImageUrl() {
    return `https://localhost:7280/api/RecipeCategory/getImage/${this.recipeCategory.imagePath}`;
  }
}
