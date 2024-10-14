import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AhmadService } from '../../../services/ahmad.service';
import { ScheduleDTO } from './ScheduleDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  scheduleId: number | null = null;
  classes: any[] = [];
  instructors: any[] = [];

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

    this.loadAllSchedules();
  }

  loadSchedule(id: number) {
    this.ahmadService.getScheduleById(id).subscribe(
      schedule => {
        if (schedule) {
          this.scheduleForm.patchValue({
            classId: schedule.classId,
            availableDay: schedule.availableDay,
            startTime: schedule.startTime.split(':')[0],
            endTime: schedule.endTime.split(':')[0],
            instructorId: schedule.instructorId
          });
        } else {
          console.error('No schedule found for the given ID');
        }
      },
      error => {
        console.error('Error loading schedule:', error);
      }
    );
  }

  loadAllSchedules() {
    this.ahmadService.getAllSchedules().subscribe(
      schedules => {
        this.classes = schedules.map(s => ({ id: s.classId, name: s.className }));
        this.instructors = schedules.map(s => ({ id: s.instructorId, name: s.instructorName }));
      },
      error => {
        console.error('Error loading schedules:', error);
      }
    );
  }

  deleteSchedule() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this schedule!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ahmadService.deleteSchedule(this.scheduleId!).subscribe(
          response => {
            Swal.fire('Deleted!', 'Your schedule has been deleted.', 'success');
            this.router.navigate(['/Allschedule']);
          },
          error => {
            Swal.fire('Deleted!', 'Your schedule has been deleted.', 'success');
            this.router.navigate(['/Allschedule']);
          }
        );
      }
    });
  }




  onSubmit() {
    if (this.scheduleForm.valid) {
      const formValues = this.scheduleForm.value;
      const selectedClass = this.classes.find(c => c.id === formValues.classId);
      const selectedInstructor = this.instructors.find(i => i.id === formValues.instructorId);

      const scheduleData: ScheduleDTO = {
        id: this.scheduleId!,
        classId: formValues.classId,
        className: selectedClass ? selectedClass.name : '',
        availableDay: formValues.availableDay,
        startTime: formValues.startTime + ':00',
        endTime: formValues.endTime + ':00',
        instructorId: formValues.instructorId,
        instructorName: selectedInstructor ? selectedInstructor.name : ''
      };

      // SweetAlert confirmation
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this schedule?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ahmadService.updateSchedule(this.scheduleId!, scheduleData).subscribe(
            response => {
              console.log('Schedule updated successfully:', response);
              Swal.fire(
                'Updated!',
                'The schedule has been updated.',
                'success'
              );
              this.router.navigate(['/Allschedule']);
            },
            error => {
              console.error('Error updating schedule:', error);
              Swal.fire(
                'Error!',
                'There was a problem updating the schedule.',
                'error'
              );
            }
          );
        }
      });
    }
  }

}
