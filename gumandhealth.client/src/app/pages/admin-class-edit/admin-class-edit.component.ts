import { Component, OnInit } from '@angular/core';
import { AhmadService } from '../../services/ahmad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FawarehService } from '../../services/fawareh.service';

@Component({
  selector: 'app-admin-class-edit',
  templateUrl: './admin-class-edit.component.html',
  styleUrls: ['./admin-class-edit.component.css']
})
export class AdminClassEditComponent {

  imageFile: any
  changeImage(event: any) {

    this.imageFile = event.target.files[0]

  }
 

  constructor(private _ser: FawarehService, private _route: ActivatedRoute, private _router: Router) { }


  classId: any;
  ngOnInit() {
    this.classId = this._route.snapshot.paramMap.get("id");
  }


  updateClass(data: any) {
    debugger
    var formdata = new FormData();


    for (let item in data) {
      formdata.append(item, data[item])
    }

    formdata.append("imagePath", this.imageFile)

    this._ser.editClass(this.classId, formdata).subscribe((data) => {
      alert("Service Updated Successfully !")
      //this._router.navigate(["/dashboard"])
    });
  }
}










  ////////////////////////////
  //  deleteClass(): void {
  //    console.log('Delete class button clicked');
  //    if (confirm('Are you sure you want to delete this class?')) {
  //      console.log('Confirmation received');
  //      console.log('Class ID to delete:', this.classItem.id);

  //      this.classService.deleteClass(this.classItem.id).subscribe(() => {
  //        console.log('Class deleted successfully');
  //        this.router.navigate(['admin/classes']);
  //      }, error => {
  //        console.error('Error deleting class:', error);
  //        alert('An error occurred while deleting the class. Please try again.');
  //      });
  //    } else {
  //      console.log('Deletion cancelled');
  //    }
  //  }
  //}

