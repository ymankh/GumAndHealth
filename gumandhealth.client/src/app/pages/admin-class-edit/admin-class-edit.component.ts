import { Component, OnInit } from '@angular/core';
import { AhmadService } from '../../services/ahmad.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-class-edit',
  templateUrl: './admin-class-edit.component.html',
  styleUrls: ['./admin-class-edit.component.css']
})
export class AdminClassEditComponent implements OnInit {
  classItem: any = {};

  constructor(
    private classService: AhmadService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const classId = +this.route.snapshot.paramMap.get('id')!;
    this.classService.getClassById(classId).subscribe(
      data => {
        this.classItem = data;
      },
      error => {
        console.error('Error fetching class:', error);
      }
    );
  }

  updateClass(): void {
    const payload = {
      id: this.classItem.id,
      name: this.classItem.name,
      description: this.classItem.description,
      imagePath: this.classItem.imagePath,
      pricePerMonth: this.classItem.pricePerMonth,
      availableDay: this.classItem.availableDay,
      startTime: this.formatTime(this.classItem.startTime),
      endTime: this.formatTime(this.classItem.endTime),
      instructorName: this.classItem.instructorName
    };

    console.log('Payload being sent:', JSON.stringify(payload, null, 2));

    this.classService.updateClass(this.classItem.id, payload).subscribe(
      () => {
        console.log('Class updated successfully');
        this.router.navigate(['/displayClasses']);
      },
      error => {
        console.error('Error updating class:', error);
        if (error.error && error.error.errors) {
          console.log('Validation errors:', error.error.errors);
        }
      }
    );
  }

  formatTime(time: string): string {
    if (!time) return "";
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  }
}
