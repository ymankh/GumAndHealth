import { Component } from '@angular/core';
import { NajlaaService } from '../../../services/najlaa.service';
import { ActivatedRoute, Router } from '@angular/router'; // استيراد Router
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-category-admin-post',
  templateUrl: './recipe-category-admin-post.component.html',
  styleUrls: ['./recipe-category-admin-post.component.css']
})
export class RecipeCategoryAdminPostComponent {
  recipeCategory = {
    name: '',
    description: ''
  };
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private najlaaService: NajlaaService, private router: Router) { } // إضافة Router إلى constructor

  // دالة لاختيار الصورة
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // دالة لإرسال البيانات
  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.recipeCategory.name);
      formData.append('description', this.recipeCategory.description);
      formData.append('image', this.selectedFile);

      // استخدام الخدمة لإرسال البيانات
      this.najlaaService.postRecipeCategory(formData)
        .subscribe((response: any) => {
          // SweetAlert للنجاح
          Swal.fire({
            icon: 'success',
            title: 'Category added successfully!',
            showConfirmButton: true,
            confirmButtonText: 'OK' // إضافة زر موافق
          }).then(() => {
            // إعادة التوجيه بعد الضغط على "موافق"
            this.router.navigate(['/recipe-category-admin']); // توجيه المستخدم
          });

          // تفريغ الحقول بعد الإضافة الناجحة
          this.recipeCategory.name = '';
          this.recipeCategory.description = '';
          this.selectedFile = null;

          // إعادة ضبط مدخل الصورة
          const fileInput = document.getElementById('image') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }
        }, (error: any) => {
          // SweetAlert عند حدوث خطأ
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while adding the category.',
          });
        });
    } else {
      // SweetAlert إذا لم يتم اختيار صورة
      Swal.fire({
        icon: 'warning',
        title: 'No image selected!',
        text: 'Please select an image before submitting.',
      });
    }
  }
}
