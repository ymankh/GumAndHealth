import { Component } from '@angular/core';
import { FawarehService } from '../../services/fawareh.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';  // Import SweetAlert

@Component({
  selector: 'app-single-gym',
  templateUrl: './single-gym.component.html',
  styleUrls: ['./single-gym.component.css']
})
export class SingleGymComponent {
  singleGymData: any;
  parameter: any;

  paymentMethod = 'paypal';  

  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getSingleGym(this.parameter);
  }

  constructor(
    private _ser: FawarehService,
    private _route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  getSingleGym(id: any) {
    this._ser.getSignleGym(id).subscribe((data) => {
      this.singleGymData = data;
    });
  }

  addUserSubscription(gymServiceId: number) {
    if (!this.auth.isUserLoggedIn()) {
   
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to subscribe.',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']); // Redirect to login
        }
      });
      return;
    }

    const subscriptionData = {
      gymServiceId: gymServiceId
    };

   
    this._ser.addGymSubscription(subscriptionData).subscribe(
      (response: any) => {
        const approvalUrl = response.approvalUrl;

        if (approvalUrl) {
      
          const paymentWindow = window.open(approvalUrl, '_blank', 'width=800,height=600');

          if (paymentWindow) {
          
            const pollPaymentWindow = setInterval(() => {
              if (paymentWindow.closed) {
                clearInterval(pollPaymentWindow);
            
                Swal.fire({
                  icon: 'success',
                  title: 'Payment Completed',
                  text: 'Please check your subscription status.'
                });
              }
            }, 1000);
          } else {
          
            Swal.fire({
              icon: 'error',
              title: 'Popup Blocked',
              text: 'Failed to open payment window. Please check your browser\'s pop-up settings.'
            });
          }
        } else {
       
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: 'Failed to initiate PayPal payment. Please try again.'
          });
        }
      },
      (error) => {
        console.error("Error adding subscription:", error);
  
        Swal.fire({
          icon: 'error',
          title: 'Subscription Failed',
          text: 'Failed to add subscription. Please try again.'
        });
      }
    );
  }
}
