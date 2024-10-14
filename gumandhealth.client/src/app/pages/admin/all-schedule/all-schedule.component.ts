import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadService } from '../../../services/ahmad.service';

@Component({
  selector: 'app-all-schedule',
  templateUrl: './all-schedule.component.html',
  styleUrls: ['./all-schedule.component.css']
})
export class AllScheduleComponent implements OnInit {
  schedules: any[] = [];

  constructor(private ahmadService: AhmadService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllSchedules();
  }

  loadAllSchedules(): void {
    this.ahmadService.getAllSchedules().subscribe(
      data => {
        this.schedules = data; // Update this line based on your API response structure
      },
      error => {
        console.error('Error fetching schedules', error);
      }
    );
  }

  viewDetails(id: number): void {
    this.router.navigate(['/edit-schedule', id]);
  }

}
