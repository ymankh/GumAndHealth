import { Component, OnInit } from '@angular/core';
import { RawaahService } from '../../../services/rawaah.service'; // استيراد الخدمة
import { Router } from '@angular/router'; // استيراد Router

@Component({
  selector: 'app-get-all-user',
  templateUrl: './get-all-user.component.html',
  styleUrls: ['./get-all-user.component.css']
})
export class GetAllUserComponent implements OnInit {
  users: any[] = []; // مصفوفة لتخزين بيانات المستخدمين

  constructor(private rawaahService: RawaahService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers(); // استدعاء دالة جلب المستخدمين عند التهيئة
  }

  // دالة لجلب جميع المستخدمين من الخدمة
  getAllUsers(): void {
    this.rawaahService.getAllUsers().subscribe(
      (data) => {
        this.users = data; // تخزين البيانات في المصفوفة
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // دالة للتنقل إلى صفحة تفاصيل المستخدم
  goToUserDetails(userId: number): void {
    this.router.navigate([`/user-details/${userId}`]); // التنقل إلى صفحة التفاصيل
  }
}
