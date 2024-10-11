import { Component } from '@angular/core';
import { AhmadService } from '../../services/ahmad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {


  ngOnInit() { }

  constructor(private _ser: AhmadService) { }



  addNewContact(data: any) {
    console.log("Data to be sent:", data); // Check the structure of the data

    this._ser.addContact(data).subscribe(
      () => {
        Swal.fire({
          title: 'Success!',
          text: 'Thank you for your message',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error("There was an error!", error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred: ' + JSON.stringify(error),
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

}


