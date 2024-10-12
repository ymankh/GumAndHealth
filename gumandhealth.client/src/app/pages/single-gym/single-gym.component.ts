import { Component } from '@angular/core';
import { FawarehService } from '../../services/fawareh.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-gym',
  templateUrl: './single-gym.component.html',
  styleUrls: ['./single-gym.component.css']
})
export class SingleGymComponent {
  singleGymData: any;
  parameter: any;

  paymentMethod = 'paypal';  // Set the payment method to 'paypal'

  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getSingleGym(this.parameter);
  }

  constructor(private _ser: FawarehService, private _route: ActivatedRoute) { }

  getSingleGym(id: any) {
    this._ser.getSignleGym(id).subscribe((data) => {
      this.singleGymData = data;
    });
  }

  addUserSubscription(gymServiceId: number) {
    const subscriptionData = {
      gymServiceId: gymServiceId
    };

    // Call the service to add the subscription and get PayPal approval URL
    this._ser.addGymSubscription(subscriptionData).subscribe(
      (response: any) => {
        const approvalUrl = response.approvalUrl;

        if (approvalUrl) {
          // Open PayPal approval URL in a new pop-up window
          const paymentWindow = window.open(approvalUrl, '_blank', 'width=800,height=600');

          if (paymentWindow) {
            // Poll for payment window closure
            const pollPaymentWindow = setInterval(() => {
              if (paymentWindow.closed) {
                clearInterval(pollPaymentWindow);
                alert("Payment process completed. Please check your subscription status.");
                
              }
            }, 1000);
          } else {
            alert("Failed to open payment window. Please check your browser's pop-up settings.");
          }
        } else {
          alert("Failed to initiate PayPal payment. Please try again.");
        }
      },
      (error) => {
        console.error("Error adding subscription:", error);
        alert("Failed to add subscription. Please try again.");
      }
    );
  }
}
