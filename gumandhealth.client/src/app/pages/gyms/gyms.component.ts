import { Component } from '@angular/core';
import { FawarehService } from '../../services/fawareh.service';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrl: './gyms.component.css'
})
export class GymsComponent {

  ngOnInit() {

    this.getAllGyms();
    
  }

  constructor(private _ser:FawarehService) { }


  allGyms: any
  getAllGyms() {
    this._ser.getAllGyms().subscribe((data) => {
      this.allGyms = data;
     
    })
  }

}
