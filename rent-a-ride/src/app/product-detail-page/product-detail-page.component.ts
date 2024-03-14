import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { response } from 'express';

/** Declare Razorpay as an external variable */
declare var Razorpay: any;

/** Component for displaying product details */
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent implements OnInit {
  carId:any;
  carDetail:any;
  constructor(private http:HttpClient,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next:(data:any)=>{
        this.carId = data._id
        // console.log(data);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.http.get(`http://localhost:3001/cars/car?_id=${this.carId}`).subscribe({
      next:(response)=>{
        this.carDetail = response
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
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
      const updateAvailability = {
        availability : false
      }
      this.http.put(`http://localhost:3001/cars/updateCars?carId=${this.carId}`,updateAvailability).subscribe({
        next:(response)=>{
          console.log(response);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })

    };

    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };

    Razorpay.open(options, successCallback, failureCallback);
  }
}
