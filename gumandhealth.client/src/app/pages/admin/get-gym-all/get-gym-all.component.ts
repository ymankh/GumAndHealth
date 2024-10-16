import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { NajlaaService } from '../../../services/najlaa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-gym-all',
  templateUrl: './get-gym-all.component.html',
  styleUrls: ['./get-gym-all.component.css'] // Fix typo (styleUrl -> styleUrls)
})

export class GetGymAllComponent {
  gymServices: any[] = [];
  errorMessage: string = '';

  constructor(private najlaaService: NajlaaService, private router: Router) { } // Inject Router

  ngOnInit(): void {
    // Fetch gym services on component initialization
    this.getAllGymServices();
  }

  editGymService(id: number): void {
    // Redirect to the edit page with the gym ID
    this.router.navigate(['put-gym', id]);
  }

  addGymService(): void {
    // Navigate to the '/post-gym' page
    this.router.navigate(['post-gym']);
  }

  getAllGymServices() {
    this.najlaaService.getGymServices().subscribe({
      next: (data: any[]) => {
        this.gymServices = data; // Save data in array
      },
      error: (error: any) => {
        console.error('Error fetching gym services', error);
        this.errorMessage = 'Error fetching gym services'; // Save error message
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
          this.getAllGymServices(); // Refresh the list after deletion
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
