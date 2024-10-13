import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {
  @Input() instructor: any; // Input for the instructor
  @Output() close = new EventEmitter<void>(); // Event emitter for closing the component
  imageFile: File | null = null; // Variable to store selected image file

  constructor(private instructorService: InstructorService) { }

  ngOnInit() {
    // Any additional setup when starting
  }

  // Method to handle image selection
  onImageSelected(event: any): void {
    const file: File = event.target.files[0]; // Get the first file
    if (file) {
      this.imageFile = file; // Set the selected file
      console.log('Selected image file:', this.imageFile); // Log the selected file
    } else {
      console.log('No file selected.'); // Log if no file is selected
    }
  }

  updateInstructor(form: any) {
    if (form.valid) {
      const formData = new FormData();
      // Append instructor data to FormData
      for (let key in this.instructor) {
        formData.append(key, this.instructor[key]);
      }

      // Append image file if selected
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      this.instructorService.updateInstructor(this.instructor.id, formData).subscribe(
        (response) => {
          console.log('Instructor updated successfully!', response);
          this.close.emit(); // Close the component after update
        },
        (error) => {
          console.error('Error updating instructor:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.close.emit(); // Close the component when cancel button is clicked
  }
}
