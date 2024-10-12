import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface ClassDto {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  pricePerMonth: number;
  availableDay: string;
  startTime: string; // Adjust type if needed
  endTime: string;   // Adjust type if needed
  instructorName: string;
}

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.css']
})
export class AdminClassesComponent implements OnInit {
  classes: ClassDto[] = []; // Initialize the array to store classes
  private apiUrl = 'https://localhost:44325/api/classCrud/allClasses';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getClasses(); // Fetch the classes when the component initializes
  }

  getClasses(): void {
    this.http.get<ClassDto[]>(this.apiUrl).subscribe((data) => {
      this.classes = data; // Store the fetched classes in the class property
    });
  }
}
