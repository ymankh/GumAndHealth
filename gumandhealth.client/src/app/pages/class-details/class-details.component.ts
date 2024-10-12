import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RahafService } from '../../services/rahaf.service';
import Swal from 'sweetalert2';

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

  getUniqueDays(): string[] {
    const uniqueDays = new Set(this.classDetails?.schedules.map(schedule => schedule.availableDay));
    return Array.from(uniqueDays);
  }

  getSchedulesByDay(day: string): Schedule[] {
    return this.classDetails?.schedules.filter(schedule => schedule.availableDay === day) || [];
  }

  ///////////////////////////////////////////////////////////////////////////
  joinClass(classScheduleId: number) {
    this._ser.getClassByID(classScheduleId).subscribe(
      (response) => {
        if (response && response.ClassName && response.ClassPrice) {
          const startDate = new Date();
          const endDate = new Date(startDate);
          endDate.setMonth(startDate.getMonth() + 1);

          Swal.fire({
            title: 'Join the Class',
            html: `
            <p><strong>Class Name:</strong> ${response.ClassName}</p>
            <p><strong>Start Date:</strong> ${startDate.toLocaleDateString()}</p>
            <p><strong>End Date:</strong> ${endDate.toLocaleDateString()}</p>
            <p><strong>Amount:</strong> ${response.ClassPrice} JOD</p>
          `,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              this._ser.createOrder(response.ClassPrice).subscribe(
                orderResponse => {
                  console.log('Order created:', orderResponse);
                  Swal.fire('Success', 'Your order has been created.', 'success');
                },
                error => {
                  console.error('Error creating order:', error);
                  Swal.fire('Error', 'Failed to create order. Please try again.', 'error');
                }
              );
            }
          });
        } else {
          Swal.fire('Error', 'Class details are incomplete.', 'error');
        }
      },
      (error) => {
        console.error('Error fetching class details:', error);
        Swal.fire('Error', 'Failed to fetch class details. Please try again.', 'error');
      }
    );
  }














}
