import { Component } from '@angular/core';
import { FawarehService } from '../../services/fawareh.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-gym',
  templateUrl: './single-gym.component.html',
  styleUrl: './single-gym.component.css'
})
export class SingleGymComponent {

  parameter: any

  ngOnInit() {
 

    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getSingleGym(this.parameter);

  }

  constructor(private _ser: FawarehService, private _route: ActivatedRoute) { }

  singleGymData: any
  getSingleGym(id: any) {
    this._ser.getSignleGym(id).subscribe((data) => {
      this.singleGymData = data;

    })
  }

}
