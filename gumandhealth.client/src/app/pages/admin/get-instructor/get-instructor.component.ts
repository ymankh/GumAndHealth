import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';

@Component({
  selector: 'app-get-instructor',
  templateUrl: './get-instructor.component.html',
  styleUrls: ['./get-instructor.component.css']
})
export class GetInstructorComponent implements OnInit {
  instructors: any[] = [];
  selectedInstructor: any = null; // For holding the selected instructor

  constructor(private instructorService: InstructorService) { }

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors() {
    this.instructorService.getInstructors().subscribe(
      (data) => {
        this.instructors = data;
      },
      (error) => {
        console.error('Error fetching instructors:', error);
      }
    );
  }

  editInstructor(id: number) {
    this.selectedInstructor = this.instructors.find(i => i.id === id); // Set the selected instructor for editing
  }

  deleteInstructor(id: number) {
    if (confirm("Are you sure you want to delete this instructor?")) {
      this.instructorService.deleteInstructor(id).subscribe(
        (response) => {
          this.getInstructors(); // Refresh the instructor list after deletion
        },
        (error) => {
          console.error('Error deleting instructor:', error);
        }
      );
    }
  }

  closeModal() {
    this.selectedInstructor = null; // Clear the selected instructor when closing
  }
}
