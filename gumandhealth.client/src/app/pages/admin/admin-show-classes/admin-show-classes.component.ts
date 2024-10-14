import { Component } from '@angular/core';
import { FawarehService } from '../../../services/fawareh.service';



@Component({
  selector: 'app-admin-show-classes',
  templateUrl: './admin-show-classes.component.html',
  styleUrl: './admin-show-classes.component.css'
})
export class AdminShowClassesComponent {
  ngOnInit() {
    this.getAllClasses()

  }

  constructor(private _ser: FawarehService) {

  }

  allClasses: any

  getAllClasses() {
    this._ser.getAllClasses().subscribe((data) =>
      this.allClasses = data

    )
  }



  deleteClass(classId: number): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this._ser.deleteClassService(classId).subscribe({
        next: (response) => {
          debugger
          alert('Class deleted successfully!'); 
          console.log('Delete response:', response); 
          
        },
        error: (error) => {
          console.error('Error deleting class:', error);
          alert('Failed to delete class.'); 
        }
      });
    }
  }
}
