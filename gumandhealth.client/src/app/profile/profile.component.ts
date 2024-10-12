import { Component, OnInit } from '@angular/core';
import { RawaahService } from '../services/rawaah.service'; // استيراد خدمة API
import { Router } from '@angular/router'; // لإعادة التوجيه بين الصفحات

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = 1; // معرف المستخدم
  userProfile: any;
  userOrders: any[] = []; // الطلبات
  userSubscriptions: any[] = []; // الاشتراكات

  constructor(private apiService: RawaahService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserOrders();
    this.loadUserSubscriptions();
  }

  // تحميل بيانات المستخدم
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

  // تحميل الطلبات
  loadUserOrders(): void {
    this.apiService.getUserOrders(this.userId).subscribe(
      (data: any) => {
        this.userOrders = data;
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }

  // تحميل الاشتراكات
  loadUserSubscriptions(): void {
    this.apiService.getUserSubscriptions(this.userId).subscribe(
      (data: any) => {
        this.userSubscriptions = data;
      },
      (error) => {
        console.error('Error fetching user subscriptions:', error);
      }
    );
  }
}
