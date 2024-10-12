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

  joinClass(id : number) {

  }
}
