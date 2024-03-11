import { Component } from '@angular/core';

declare var Razorpay: any;

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent {
  productRating: string = '4.8(56)';
  price: string = '150 Rs';
  brand: string = 'Toyota';
  model: string = 'Corolla';
  capacity: string = '5 passengers';
  type: string = 'Manual';
  fuelType: string = 'Petrol';
  mileage: string = '30 mpg';
  year: string = '2023';
  payNow() {
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 300000,
      name: 'Mugdha',
      key: 'rzp_test_D7Ve9gsjct6KgY',
      image: '',
      prefill: {
        name: 'Mugdha Padgelwar',
        email: 'mugdhapadgelwar2002@gmail.com',
        contact: '8459247750',
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
