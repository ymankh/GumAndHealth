import { Component } from '@angular/core';
import { NajlaaService } from '../../../services/najlaa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-gym-all',
  templateUrl: './get-gym-all.component.html',
  styleUrl: './get-gym-all.component.css'
})

export class GetGymAllComponent {
  gymServices: any[] = []; 
  errorMessage: string = '';
    router: any;
  
  constructor(private najlaaService: NajlaaService) { }
  ngOnInit(): void {
    // جلب بيانات الخدمات عند تهيئة المكون
    this.getAllGymServices();
  }
  addGymService(): void {
    this.router.navigate(['post-gym']); // Navigate to the '/post-gym' page
  }
  getAllGymServices() {
    this.najlaaService.getGymServices().subscribe({
      next: (data: any[]) => {
        this.gymServices = data; // حفظ البيانات في المصفوفة
      },
      error: (error: any) => {
        console.error('Error fetching gym services', error);
        this.errorMessage = 'Error fetching gym services'; // حفظ رسالة الخطأ
      }
    });
  }
  // Confirmation before deletion
  confirmDeleteGymService(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteGymService(id);
      }
    });
  }

  // Method to call the API and delete the gym service
  deleteGymService(id: number): void {
    this.najlaaService.deleteGymService(id).subscribe(
      (response: any) => {
        // Success: Show success message
        Swal.fire({
          icon: 'success',
          title: 'Gym service deleted successfully!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          // Optionally refresh or navigate to a different page
          this.router.navigate(['/get-gym-all']); // Navigate to gym service list page
        });
      },
      (error: any) => {
        // Error: Show error message
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete gym service',
          text: 'Please try again later.',
          confirmButtonText: 'Ok'
        });
      }
    );
  }
}
