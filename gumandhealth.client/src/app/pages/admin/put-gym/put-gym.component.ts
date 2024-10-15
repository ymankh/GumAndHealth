import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../../services/najlaa.service';  // تأكد من صحة اسم الخدمة
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-put-gym',
  templateUrl: './put-gym.component.html',
  styleUrls: ['./put-gym.component.css']
})
export class PutGymComponent implements OnInit {
  gymForm: FormGroup;
  selectedFile: File | null = null;
  gymId: number;
  previousImageUrl: string | null = null;  // متغير لحفظ الصورة السابقة

  constructor(
    private fb: FormBuilder,
    private najlaaService: NajlaaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize form
    this.gymForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      pricePerMonth: ['', Validators.required],
      womenShiftStart: ['', Validators.required],
      womenShiftEnd: ['', Validators.required],
      menShiftStart: ['', Validators.required],
      menShiftEnd: ['', Validators.required],
      isMixed: [false],
      image: [Validators.required]
    });

    // Get the ID from the route
    this.gymId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadGymService();
  }

  // Load existing gym service data
  loadGymService(): void {
    this.najlaaService.getGymService1(this.gymId).subscribe(
      (response: any) => {
        // Populate form with existing data
        this.gymForm.patchValue({
          name: response.name,
          description: response.description,
          pricePerMonth: response.pricePerMonth,
          womenShiftStart: response.womenShiftStart,
          womenShiftEnd: response.womenShiftEnd,
          menShiftStart: response.menShiftStart,
          menShiftEnd: response.menShiftEnd,
          isMixed: response.isMixed,
          Image: response.imagePath
        });

        // Assign previous image URL (assuming it's included in the response)
        this.previousImageUrl = response.imagePath;  // هنا نتأكد من وجود رابط الصورة السابقة
      },
      (error: any) => {
        console.error('Failed to load gym service data', error);
      }
    );
  }

  // File selection handler
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Update gym service
  onSubmit(): void {
    if (this.gymForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.gymForm.get('name')?.value);
      formData.append('Description', this.gymForm.get('description')?.value);
      formData.append('PricePerMonth', this.gymForm.get('pricePerMonth')?.value);
      formData.append('WomenShiftStart', this.gymForm.get('womenShiftStart')?.value);
      formData.append('WomenShiftEnd', this.gymForm.get('womenShiftEnd')?.value);
      formData.append('MenShiftStart', this.gymForm.get('menShiftStart')?.value);
      formData.append('MenShiftEnd', this.gymForm.get('menShiftEnd')?.value);
      formData.append('IsMixed', this.gymForm.get('isMixed')?.value ? 'true' : 'false');
      if (this.selectedFile) {
        formData.append('Image', this.selectedFile);
      }

      this.najlaaService.updateGymService(this.gymId, formData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Gym service updated successfully!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/get-gym-all']);
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update gym service',
            text: 'Please try again later.',
            confirmButtonText: 'Ok'
          });
        }
      );
    }
  }
}
