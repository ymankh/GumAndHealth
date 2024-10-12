import { Component } from '@angular/core';
import { RawaahService } from '../services/rawaah.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'] // تصحيح هنا، كان 'styleUrl' يجب أن تكون 'styleUrls'
})
export class EditProfileComponent {
  userId!: number; // معرف المستخدم
  userProfile: any; // بيانات المستخدم
  imageFile: File | null = null; // ملف الصورة

  constructor(
    private apiService: RawaahService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!; // الحصول على معرف المستخدم من الـ URL
    this.loadUserProfile(); // تحميل ملف تعريف المستخدم
  }

  loadUserProfile(): void {
    this.apiService.getUserProfile(this.userId).subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  onImageSelected(event: any): void {
    debugger
    const file: File = event.target.files[0]; // الحصول على الملف الأول
    if (file) {
      this.imageFile = file; // تعيين الملف إلى المتغير
      console.log('Selected image file:', this.imageFile); // تحقق من القيمة
    } else {
      console.log('No file selected.'); // رسالة في حالة عدم اختيار ملف
    }
  }


  updateProfile(data: any): void {
    debugger;
    const formData = new FormData();

    // إضافة بيانات النموذج إلى FormData
    for (let key in data) {
      formData.append(key, data[key]);
    }

    console.log('Form data:', formData); // تحقق من بيانات النموذج
    console.log('Image file before update:', this.imageFile); // تحقق من القيمة

    // إضافة الصورة إذا تم اختيارها
    if (this.imageFile) {
      formData.append('image', this.imageFile); // إضافة ملف الصورة
    } else {
      console.log('No image file to upload.'); // رسالة في حالة عدم اختيار ملف
    }

    // استدعاء الخدمة لتحديث ملف المستخدم
    this.apiService.updateUserProfile(this.userId, formData).subscribe(
      () => {
        console.log('User profile updated successfully');
        this.router.navigate(['/profile']); // العودة إلى صفحة عرض البيانات بعد التحديث
      },
      (error) => {
        console.error('Error updating user profile:', error);
        alert('فشل في تحديث ملف التعريف: ' + error.message);
      }
    );
  }


  cancelEdit(): void {
    this.router.navigate(['/profile']); // العودة إلى صفحة عرض البيانات عند إلغاء التعديل
  }
}
