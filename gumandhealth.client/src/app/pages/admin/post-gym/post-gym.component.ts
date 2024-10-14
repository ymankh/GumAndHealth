import { Component } from '@angular/core';
import { NajlaaService } from '../../../services/najlaa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-gym',
  templateUrl: './post-gym.component.html',
  styleUrls: ['./post-gym.component.css']
})
export class POSTGymComponent {
  gymForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private najlaaService: NajlaaService, private router: Router) {
    this.gymForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      pricePerMonth: ['', Validators.required],
      womenShiftStart: ['', Validators.required],
      womenShiftEnd: ['', Validators.required],
      menShiftStart: ['', Validators.required],
      menShiftEnd: ['', Validators.required],
      isMixed: [false],
      image: [null, Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.gymForm.patchValue({
        image: file
      });
      this.gymForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.gymForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('Name', this.gymForm.get('name')?.value);
      formData.append('Description', this.gymForm.get('description')?.value);
      formData.append('PricePerMonth', this.gymForm.get('pricePerMonth')?.value);
      formData.append('WomenShiftStart', this.gymForm.get('womenShiftStart')?.value);
      formData.append('WomenShiftEnd', this.gymForm.get('womenShiftEnd')?.value);
      formData.append('MenShiftStart', this.gymForm.get('menShiftStart')?.value);
      formData.append('MenShiftEnd', this.gymForm.get('menShiftEnd')?.value);
      formData.append('IsMixed', this.gymForm.get('isMixed')?.value ? 'true' : 'false');
      formData.append('Image', this.gymForm.get('image')?.value);

      this.najlaaService.addGymService(formData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Gym service added successfully!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/get-gym-all']);
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to add gym service',
            text: 'Please try again later.',
            confirmButtonText: 'Ok'
          });
        }
      );
    }
  }
}
