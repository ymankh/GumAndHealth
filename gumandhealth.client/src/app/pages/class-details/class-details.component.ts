import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RahafService } from '../../services/rahaf.service';

interface Schedule {
  classScheduleId: number; 
  availableDay: string;
  startTime: string;
  endTime: string;
  instructorName: string;
  instructorBio: string;
  instructorCredentials: string;
}

interface ClassDetails {
  className: string;
  classImage: string;
  description: string;
  schedules: Schedule[];
}

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css'],
})
export class ClassDetailsComponent implements OnInit {
  classDetails: ClassDetails | undefined;

  constructor(private route: ActivatedRoute, private _ser: RahafService) { }

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id'); // الحصول على ID الكلاس من URL
    this.getClassDetails(classId); // استدعاء الدالة لجلب التفاصيل
  }

  getClassDetails(classId: string | null) {
    if (classId) {
      this._ser.getClassByID(+classId).subscribe((data: ClassDetails) => {
        this.classDetails = data;
        console.log('Class Details:', this.classDetails); // تحقق من البيانات
      }, (error) => {
        console.error('Error fetching class details:', error); // معالجة الخطأ
      });
    }
  }

  // دالة لجلب الأيام الفريدة من المواعيد
  getUniqueDays(): string[] {
    const uniqueDays = new Set(this.classDetails?.schedules.map(schedule => schedule.availableDay));
    return Array.from(uniqueDays);
  }

  // دالة لجلب المواعيد بحسب اليوم
  getSchedulesByDay(day: string): Schedule[] {
    return this.classDetails?.schedules.filter(schedule => schedule.availableDay === day) || [];
  }

  
  joinClass(classScheduleId: number) {
    const startDate = new Date(); // اليوم الحالي
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1); // الشهر القادم

    // البيانات التي سنرسلها إلى API للاشتراك
    const body = {
      classScheduleId: classScheduleId,
      userId: 1, // احصل على userId من التخزين المحلي (أو أي قيمة أخرى تحتاجها)
      startDate: startDate.toISOString(), // تحويل التاريخ إلى سلسلة نصية
      endDate: endDate.toISOString() // تحويل التاريخ إلى سلسلة نصية
    };

    // إرسال طلب الاشتراك إلى API
    this._ser.postPayment(body).subscribe((response: any) => {
      // التحقق من نجاح الاشتراك
      if (response.message === 'Subscription created successfully') {
        const subscriptionId = response.subscriptionId; // الحصول على معرف الاشتراك
        this.redirectToPayPal(subscriptionId); // توجيه المستخدم إلى PayPal
      } else {
        console.error('خطأ في إنشاء الاشتراك:', response);
      }
    }, (error) => {
      console.error('خطأ في postPayment:', error);
    });
  }

  redirectToPayPal(subscriptionId: number) {
    // نقل المستخدم إلى صفحة الدفع عبر PayPal
    const redirectUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=Class+Subscription&amount=10.00&currency_code=USD&return=https://localhost:7280/api/Subscription/PaymentSuccess/${subscriptionId}&cancel_return=https://localhost:7280/api/Subscription/PaymentCancel/${subscriptionId}`;

    window.location.href = redirectUrl;
  }

}
