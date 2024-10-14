import { Component } from '@angular/core';
import { FawarehService } from '../../../services/fawareh.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-class',
  templateUrl: './add-new-class.component.html',
  styleUrl: './add-new-class.component.css'
})
export class AddNewClassComponent {


  ngOnInit() {

  }

  constructor(private _ser: FawarehService) { }



  image: any

  changeImage(event: any) {
    this.image = event.target.files[0]
  }



  addNewClass(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }


    form.append("imagePath", this.image)
    this._ser.addClass(form).subscribe(() =>

      alert("Service Added")


    )
}




}
