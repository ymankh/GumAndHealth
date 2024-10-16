import { Component, OnInit } from '@angular/core';
import { FawarehService } from '../../services/fawareh.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-class-edit',
  templateUrl: './admin-class-edit.component.html',
  styleUrls: ['./admin-class-edit.component.css']
})
export class AdminClassEditComponent implements OnInit {

  classId: any;
  classData: any = {}; // Store the class data

  imageFile: any;

  constructor(
    private _ser: FawarehService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.classId = this._route.snapshot.paramMap.get("id");

    // Fetch the class data
    this._ser.getSignleClass(this.classId).subscribe(
      (data) => {
        this.classData = data;  // Store the fetched class data
      },
      (error) => {
        console.error("Error fetching class data:", error);
      }
    );
  }

  changeImage(event: any) {
    this.imageFile = event.target.files[0];
  }

  updateClass(data: any) {
    var formdata = new FormData();

    for (let item in data) {
      formdata.append(item, data[item]);
    }

    formdata.append("imagePath", this.imageFile);

    this._ser.editClass(this.classId, formdata).subscribe((response) => {
      alert("Class Updated Successfully!");
    });
  }
}
