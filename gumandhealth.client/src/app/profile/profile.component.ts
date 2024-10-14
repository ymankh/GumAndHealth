//////import { Component, OnInit } from '@angular/core';
//////import { RawaahService } from '../services/rawaah.service'; // استيراد خدمة API
//////import { Router } from '@angular/router'; // لإعادة التوجيه بين الصفحات

//////@Component({
//////  selector: 'app-profile',
//////  templateUrl: './profile.component.html',
//////  styleUrls: ['./profile.component.css']
//////})
//////export class ProfileComponent implements OnInit {
//////  userId: number = 1; // معرف المستخدم
//////  userProfile: any;
//////  userOrders: any[] = []; // الطلبات
//////  userSubscriptions: any[] = []; // الاشتراكات

//////  constructor(private apiService: RawaahService, private router: Router) { }

//////  ngOnInit(): void {
//////    this.loadUserProfile();
//////    this.loadUserOrders();
//////    this.loadUserSubscriptions();
//////  }

//////  // تحميل بيانات المستخدم
//////  loadUserProfile(): void {
//////    this.apiService.getUserProfile(this.userId).subscribe(
//////      (data) => {
//////        this.userProfile = data;
//////      },
//////      (error) => {
//////        console.error('Error fetching user profile:', error);
//////      }
//////    );
//////  }

//////  // تحميل الطلبات
//////  loadUserOrders(): void {
//////    this.apiService.getUserOrders(this.userId).subscribe(
//////      (data: any) => {
//////        this.userOrders = data;
//////      },
//////      (error) => {
//////        console.error('Error fetching user orders:', error);
//////      }
//////    );
//////  }

//////  // تحميل الاشتراكات
//////  loadUserSubscriptions(): void {
//////    this.apiService.getUserSubscriptions(this.userId).subscribe(
//////      (data: any) => {
//////        this.userSubscriptions = data;
//////      },
//////      (error) => {
//////        console.error('Error fetching user subscriptions:', error);
//////      }
//////    );
//////  }
//////}



////import { Component, OnInit } from '@angular/core';
////import { RawaahService } from '../services/rawaah.service'; // استيراد خدمة API
////import { Router } from '@angular/router'; // لإعادة التوجيه بين الصفحات

////@Component({
////  selector: 'app-profile',
////  templateUrl: './profile.component.html',
////  styleUrls: ['./profile.component.css']
////})
////export class ProfileComponent implements OnInit {
////  userId!: number; // تعريف معرف المستخدم ديناميكيًا
////  userProfile: any;
////  userOrders: any[] = [];

////  userSubscriptions: any = {
////    GymSubscriptions: [],
////    ClassSubscriptions: []
////  };
////  constructor(private apiService: RawaahService, private router: Router) {}

////  ngOnInit(): void {
////    const storedUserId = localStorage.getItem('userId'); // جلب userId من localStorage
////    if (storedUserId) {
////      this.userId = +storedUserId; // تحويل النص إلى رقم
////      this.loadUserProfile();
////      this.loadUserOrders();
////      this.loadUserSubscriptions();
////    } else {
////      console.error('User ID not found in localStorage!');
////      this.router.navigate(['/login']); // توجيه إلى صفحة تسجيل الدخول
////    }
////  }

////  loadUserProfile(): void {
////    this.apiService.getUserProfile(this.userId).subscribe(
////      (data) => (this.userProfile = data),
////      (error) => console.error('Error fetching user profile:', error)
////    );
////  }

////  loadUserOrders(): void {
////    this.apiService.getUserOrders(this.userId).subscribe(
////      (data: any) => (this.userOrders = data),
////      (error) => console.error('Error fetching user orders:', error)
////    );
////  }

////  loadUserSubscriptions(): void {
////    this.apiService.getUserSubscriptions(this.userId).subscribe(
////      (data: any) => (this.userSubscriptions = data),
////      (error) => console.error('Error fetching user subscriptions:', error)
////    );
////  }
////}


//import { Component, OnInit } from '@angular/core';
//import { RawaahService } from '../services/rawaah.service'; // استيراد خدمة API
//import { Router } from '@angular/router'; // لإعادة التوجيه بين الصفحات

//@Component({
//  selector: 'app-profile',
//  templateUrl: './profile.component.html',
//  styleUrls: ['./profile.component.css']
//})
//export class ProfileComponent implements OnInit {
//  userId!: number; // تعريف معرف المستخدم ديناميكيًا
//  userProfile: any;
//  userOrders: any[] = [];

//  userSubscriptions: any[] = []; // تعديل نوع المتغير ليتناسب مع البيانات
//  constructor(private apiService: RawaahService, private router: Router) { }

//  ngOnInit(): void {
//    const storedUserId = localStorage.getItem('userId'); // جلب userId من localStorage
//    if (storedUserId) {
//      this.userId = +storedUserId; // تحويل النص إلى رقم
//      this.loadUserProfile();
//      this.loadUserOrders();
//      this.loadUserSubscriptions();


//    } else {
//      console.error('User ID not found in localStorage!');
//      this.router.navigate(['/login']); // توجيه إلى صفحة تسجيل الدخول
//    }
//  }

//  loadUserProfile(): void {
//    this.apiService.getUserProfile(this.userId).subscribe(
//      (data) => (this.userProfile = data),
//      (error) => console.error('Error fetching user profile:', error)
//    );
//  }

//  loadUserOrders(): void {
//    this.apiService.getUserOrders(this.userId).subscribe(
//      (data: any) => {
//        this.userOrders = data; // تعيين الطلبات المستلمة إلى المتغير
//      },
//      (error) => console.error('Error fetching user orders:', error)
//    );
//  }

//  loadUserSubscriptions(): void {
//    this.apiService.getUserSubscriptions(this.userId).subscribe(
//      (data: any) => {
//        // تأكد من أن البيانات تأتي بشكل صحيح
//        this.userSubscriptions = data;
//      },
//      (error) => console.error('Error fetching user subscriptions:', error)
//    );
//  }
//}



import { Component, OnInit } from '@angular/core';
import { RawaahService } from '../services/rawaah.service'; // استيراد خدمة API
import { Router } from '@angular/router'; // لإعادة التوجيه بين الصفحات

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number; // تعريف معرف المستخدم ديناميكيًا
  userProfile: any; // بيانات ملف المستخدم
  userOrders: any[] = []; // الطلبات
  userSubscriptions: any[] = []; // الاشتراكات

  constructor(private apiService: RawaahService, private router: Router) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId'); // جلب userId من localStorage
    if (storedUserId) {
      this.userId = +storedUserId; // تحويل النص إلى رقم
      this.loadUserProfile();
      this.loadUserOrders();
      this.loadUserSubscriptions();
    } else {
      console.error('User ID not found in localStorage!');
      this.router.navigate(['/login']); // توجيه إلى صفحة تسجيل الدخول
    }
  }

  // تحميل بيانات المستخدم
  loadUserProfile(): void {
    this.apiService.getUserProfile(this.userId).subscribe(
      (data) => {
        this.userProfile = data; // تعيين بيانات المستخدم
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  //// تحميل الطلبات
  //loadUserOrders(): void {
  //  this.apiService.getUserOrders(this.userId).subscribe(
  //    (data: any) => {
  //      this.userOrders = Array.isArray(data) ? data : []; // التأكد من أن البيانات مصفوفة
  //    },
  //    (error) => {
  //      console.error('Error fetching user orders:', error);
  //    }
  //  );
  //}

  //// تحميل الاشتراكات
  //loadUserSubscriptions(): void {
  //  this.apiService.getUserSubscriptions(this.userId).subscribe(
  //    (data: any) => {
  //      this.userSubscriptions = Array.isArray(data) ? data : []; // التأكد من أن البيانات مصفوفة
  //    },
  //    (error) => {
  //      console.error('Error fetching user subscriptions:', error);
  //    }
  //  );
  //}




  loadUserOrders(): void {
    this.apiService.getUserOrders(this.userId).subscribe(
      (data: any) => {
        this.userOrders = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }

  loadUserSubscriptions(): void {
    this.apiService.getUserSubscriptions(this.userId).subscribe(
      (data: any) => {
        this.userSubscriptions = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error fetching user subscriptions:', error);
      }
    );
  }

  isActive(endDate: string): boolean {
    const today = new Date();
    return new Date(endDate) >= today;
  }

}
