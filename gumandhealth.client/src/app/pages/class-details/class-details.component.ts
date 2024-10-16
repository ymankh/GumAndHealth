import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RahafService } from '../../services/rahaf.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


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

  constructor(private route: ActivatedRoute, private _ser: RahafService, private auth: AuthService, private router: Router) { }

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

  getUniqueDays(): string[] {
    const uniqueDays = new Set(this.classDetails?.schedules.map(schedule => schedule.availableDay));
    return Array.from(uniqueDays);
  }

  getSchedulesByDay(day: string): Schedule[] {
    return this.classDetails?.schedules.filter(schedule => schedule.availableDay === day) || [];
  }

  ///////////////////////////////////////////////////////////////////////////
  joinClass(classScheduleId: number) {
    this._ser.getClassByID(classScheduleId).subscribe((response) => {
      console.log('API Response:', response);

      if (response && response.className && response.classPrice) {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);

        Swal.fire({
          title: 'Join the Class',
          html: `
          <p><strong>Class Name:</strong> ${response.className}</p>
          <p><strong>Start Date:</strong> ${startDate.toLocaleDateString()}</p>
          <p><strong>End Date:</strong> ${endDate.toLocaleDateString()}</p>
          <p><strong>Amount:</strong> ${response.classPrice} JOD</p>
        `,
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          icon: 'info'
        }).then((result) => {
          if (result.isConfirmed) {
            this.AddSubscription(classScheduleId, 1);
          }
        });
      }
    });
  }
  paymentData: any = {
    "idSubs": 1,
    "userID": 0
  }
  AddSubscription(idSubs: any, Iduser: any) {
    if (!this.auth.isUserLoggedIn()) {

      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to subscribe.',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']); // Redirect to login
        }
      });
      return;
    }
    this.paymentData.idSubs = idSubs
    this.paymentData.userID = Iduser
    console.log("payment data :", this.paymentData);
    this._ser.postCreatePayment(this.paymentData).subscribe((data) => {
      const width = 600;
      const height = 700;
      const left = (screen.width / 2) - (width / 2);
      const top = (screen.height / 2) - (height / 2);

      const popupWindow = window.open(
        data.approvalUrl,
        'PayPal Payment',
        `width = ${ width }, height = ${ height }, top = ${ top }, scrollbars = yes, resizable = yes`
      );

      const checkWindowClosed = setInterval(() => {
        if (popupWindow && popupWindow.closed) {
          clearInterval(checkWindowClosed);
          Swal.fire({
            icon: "success",
            title: "Subscribed Successfully!",
            showConfirmButton: false,
            timer: 2000
          });
        }
      }, 500);

    },
      (error) => {
        console.error("Error creating payment:", error); // طباعة تفاصيل الخطأ

        Swal.fire({
          icon: "warning",
          title: `${ error.error }`,
          showConfirmButton: false,
          timer: 2000
      });
  });
}



}
