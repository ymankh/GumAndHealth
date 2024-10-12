import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NajlaaService } from '../../../services/najlaa.service'; // استيراد الخدمة
import { Router } from '@angular/router'; // استيراد Router

@Component({
  selector: 'app-recipe-admin-post',
  templateUrl: './recipe-admin-post.component.html',
  styleUrls: ['./recipe-admin-post.component.css'] // تصحيح اسم الخاصية
})
export class RecipeAdminPostComponent {
  recipeForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private najlaaService: NajlaaService, // استخدام الخدمة
    private router: Router // إضافة Router
  ) {
    // إنشاء النموذج
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      caloriesCount: ['', Validators.required],
      ingredients: ['', Validators.required],
      recipe1: ['', Validators.required],
      recipeCategoryId: [1, Validators.required] // افتراضياً تم وضعه للقسم
    });
  }

  // دالة لاختيار الملف
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // دالة تقديم النموذج
  onSubmit() {
    if (this.recipeForm.invalid || !this.selectedFile) {
      return;
    }

    // إعداد البيانات التي سيتم إرسالها
    const formData = new FormData();
    formData.append('name', this.recipeForm.get('name')?.value);
    formData.append('description', this.recipeForm.get('description')?.value);
    formData.append('caloriesCount', this.recipeForm.get('caloriesCount')?.value);
    formData.append('ingredients', this.recipeForm.get('ingredients')?.value);
    formData.append('recipe1', this.recipeForm.get('recipe1')?.value);
    formData.append('recipeCategoryId', this.recipeForm.get('recipeCategoryId')?.value);
    formData.append('Image', this.selectedFile!, this.selectedFile!.name);

    // استخدام NajlaaService لإرسال البيانات
    this.najlaaService.addRecipe(formData).subscribe({
      next: (response: any) => {
        console.log('Recipe added successfully', response);
        // توجيه المستخدم إلى صفحة أخرى بعد النجاح
        this.router.navigate(['/recipes']);
      },
      error: (error: any) => {
        console.error('Error occurred while adding recipe', error);
        // يمكنك إضافة معالجات أخطاء أخرى هنا
      }
    });
  }
}
