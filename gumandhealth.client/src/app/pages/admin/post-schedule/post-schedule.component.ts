import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AhmadService } from '../../../services/ahmad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-schedule',
  templateUrl: './post-schedule.component.html',
  styleUrls: ['./post-schedule.component.css']
})
export class PostScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  classes: any[] = [];
  instructors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ahmadService: AhmadService,
    private router: Router
  ) {
    this.scheduleForm = this.fb.group({
      classId: [0, Validators.required],
      availableDay: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      instructorId: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.loadClasses();
    this.loadInstructors();
  }
  loadClasses() {
    this.ahmadService.getAllSchedules().subscribe(data => {
      const uniqueClasses = new Map();
      data.forEach(item => {
        if (!uniqueClasses.has(item.classId)) {
          uniqueClasses.set(item.classId, { id: item.classId, name: item.className });
        }
      });
      this.classes = Array.from(uniqueClasses.values());
    });
  }

  loadInstructors() {
    this.ahmadService.getAllSchedules().subscribe(data => {
      const uniqueInstructors = new Map();
      data.forEach(item => {
        if (!uniqueInstructors.has(item.instructorId)) {
          uniqueInstructors.set(item.instructorId, { id: item.instructorId, name: item.instructorName });
        }
      });
      this.instructors = Array.from(uniqueInstructors.values());
    });
  }



  onSubmit() {
    if (this.scheduleForm.valid) {
      // Format start and end time to HH:mm:ss
      const formattedStartTime = this.formatTime(this.scheduleForm.value.startTime);
      const formattedEndTime = this.formatTime(this.scheduleForm.value.endTime);

      const scheduleData = {
        classId: this.scheduleForm.value.classId,
        availableDay: this.scheduleForm.value.availableDay,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        instructorId: this.scheduleForm.value.instructorId
      };

      // Log the schedule data to verify the structure and values
      console.log('Submitting schedule data:', JSON.stringify(scheduleData));

      this.ahmadService.addSchedule(scheduleData).subscribe(
        response => {
          Swal.fire('Success!', 'Schedule added successfully.', 'success');
          this.router.navigate(['/Allschedule']);
        },
        error => {
          console.error('Error adding schedule:', error);
          if (error.error && error.error.message) {
            Swal.fire('Error!', error.error.message, 'error');
          } else {
            Swal.fire('Error!', 'There was a problem adding the schedule.', 'error');
          }
        }
      );
    } else {
      Swal.fire('Error!', 'Please fill all required fields correctly.', 'warning');
    }
  }

  // Helper method to format time
  private formatTime(time: string): string {
    const timeParts = time.split(':');
    if (timeParts.length === 2) {
      return `${timeParts[0]}:${timeParts[1]}:00`; // Append seconds
    }
    return time; // Return as is if already in HH:mm:ss format
  }


}
