import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AhmadService } from '../../../services/ahmad.service';

interface ScheduleDTO {
  id: number;
  classId: number;
  availableDay: string;
  startTime: string | null;
  endTime: string | null;
  instructorId: number;
}

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  scheduleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private ahmadService: AhmadService,
    private route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.scheduleId = +params['id'];
        this.loadSchedule(this.scheduleId);
      }
    });
  }

  loadSchedule(id: number) {
    this.ahmadService.getScheduleById(id).subscribe(
      schedule => {
        this.scheduleForm.patchValue(schedule);
      },
      error => {
        console.error('Error loading schedule:', error);
      }
    );
  }

  onSubmit() {
    if (this.scheduleForm.valid) {
      const formValues = this.scheduleForm.value;

      const scheduleData: ScheduleDTO = {
        id: this.scheduleId!,
        classId: formValues.classId,
        availableDay: formValues.availableDay,
        startTime: formValues.startTime ? formValues.startTime + ':00' : null,
        endTime: formValues.endTime ? formValues.endTime + ':00' : null,
        instructorId: formValues.instructorId
      };

      this.ahmadService.updateSchedule(this.scheduleId!, scheduleData).subscribe(
        response => {
          console.log('Schedule updated successfully:', response);
          this.router.navigate(['/schedules']);
        },
        error => {
          console.error('Error updating schedule:', error);
        }
      );
    }
  }
}
