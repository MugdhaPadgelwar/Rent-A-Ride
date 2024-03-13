import { Component } from '@angular/core';

/** Declare Razorpay as an external variable */
declare var Razorpay: any;

/** Component for displaying product details */
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent {
  /** Product rating */
  productRating: string = '4.8(56)';
  /** Price of the product */
  price: string = '150 Rs';
  /** Brand of the product */
  brand: string = 'Toyota';
  /** Model of the product */
  model: string = 'Corolla';
  /** Capacity of the product */
  capacity: string = '5 passengers';
  /** Type of the product */
  type: string = 'Manual';
  /** Fuel type of the product */
  fuelType: string = 'Petrol';
  /** Mileage of the product */
  mileage: string = '30 mpg';
  /** Year of the product */
  year: string = '2023';

  /**
   * Function to handle payment using Razorpay.
   */
  payNow() {
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 300000,
      name: 'Shruti',
      key: 'rzp_test_rcZDiWvY5D4oKi',
      image: '',
      prefill: {
        name: 'Shruti Shrivastav',
        email: 'shrutishrivastav938@gmail.com',
        contact: '8624833069',
      },
      theme: {
        color: '#f37254',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        },
      },
    };

    const successCallback = (paymentId: any) => {
      console.log('Payment successful with ID:', paymentId);
    };
    
    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };

    Razorpay.open(options, successCallback, failureCallback);
  }
}
