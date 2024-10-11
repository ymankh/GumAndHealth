import { Component, OnInit } from '@angular/core';
import { RahafService } from '../../services/rahaf.service';
import { Router } from '@angular/router';

interface ClassSchedule {
  name: string;
  startTime: string;
  endTime: string;
  day: string;
}

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  classes: any;
  schedules: ClassSchedule[] = [];
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private _ser: RahafService, private router: Router) { }

  ngOnInit() {
    this.GetTheClasses();
    this.getClassSchedules();
  }
 

  GetTheClasses() {
    this._ser.getAllClasses().subscribe((data) => {
      this.classes = data;
      this.filteredClasses = data;
    });
  }

  goToClassDetails(classID: number) {
    this.router.navigate(['ClassDetails', classID]);
  }
  getClassSchedules() {
    this._ser.getJadwal().subscribe((data: any) => {
      console.log('Data from API:', data); // تحقق من البيانات
      this.schedules = data.map((cs: any) => ({
        name: cs.className,  // استخدام اسم الكلاس
        startTime: this.convertToDate(cs.startTime),  // تحويل الوقت إلى كائن Date
        endTime: this.convertToDate(cs.endTime),
        day: cs.availableDay
      }));
      console.log('Transformed Schedules:', this.schedules); // تحقق من التحويل
    });
  }
  searchTerm: string = ''; // لحفظ نص البحث
  filteredClasses:any
  onSearch() {
    if (this.searchTerm) {
      this._ser.filter(this.searchTerm).subscribe((data) => {
        this.filteredClasses = data; // قم بتعيين الكلاسات المفلترة
      });
    } else {
      this.filteredClasses = this.classes; // إذا كان النص فارغًا، أعد الكلاسات الكاملة
    }
  }

  convertToDate(timeString: string): Date {
    if (!timeString) {
      return new Date(); // إرجاع تاريخ افتراضي أو يمكن تركه فارغًا حسب الحاجة
    }

    const timeParts = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), parseInt(timeParts[2], 10));
    return date;
  }




  // دالة تجلب الكلاسات الخاصة بيوم معين
  getClassesForDay(day: string): ClassSchedule[] {
    return this.schedules.filter(schedule => schedule.day === day);
  }

  // دالة تقوم بإنشاء الفترات الفارغة
  createEmptySlots(day: string): number[] {
    const maxSlots = 7; // افترضنا وجود 7 فترات لكل يوم
    const classesForDay = this.getClassesForDay(day);
    const emptySlots = maxSlots - classesForDay.length;
    return Array(emptySlots > 0 ? emptySlots : 0);
  }
}
