import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AhmadService } from '../../services/ahmad.service';

interface ScheduleDTO {
  id: number;
  classId: number;
  availableDay: string;
  startTime: string | null; // Allow null
  endTime: string | null; // Allow null
  instructorId: number;
}

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css']
})
export class AdminScheduleComponent {
  scheduleForm: FormGroup;

  constructor(private fb: FormBuilder, private ahmadService: AhmadService) {
    this.scheduleForm = this.fb.group({
      classId: [0, Validators.required],
      availableDay: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      instructorId: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.scheduleForm.valid) {
      const formValues = this.scheduleForm.value;

      const scheduleData: ScheduleDTO = {
        id: 0,
        classId: formValues.classId,
        availableDay: formValues.availableDay,
        startTime: formValues.startTime ? formValues.startTime + ':00' : null, // Ensure HH:mm:ss
        endTime: formValues.endTime ? formValues.endTime + ':00' : null, // Ensure HH:mm:ss
        instructorId: formValues.instructorId
      };

      console.log('Sending Schedule Data:', scheduleData);

      this.ahmadService.addSchedule(scheduleData).subscribe(
        response => {
          console.log('Schedule added successfully:', response);
          this.scheduleForm.reset();
        },
        error => {
          console.error('Error adding schedule:', error);
        }
      );
    }
  }
}
