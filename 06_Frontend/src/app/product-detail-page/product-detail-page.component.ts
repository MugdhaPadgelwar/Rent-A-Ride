import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  token:any;
  userId:any
  paymentId:any
  constructor(private http:HttpClient,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.token = localStorage.getItem('userToken')
    this.userId = localStorage.getItem('userID')
    this.route.queryParams.subscribe({
      next:(data:any)=>{
        this.carId = data._id
        // console.log(data);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      Authorization:`Bearer ${this.token}`
    })
    this.http.get(`http://localhost:3001/cars/carbyid?_id=${this.carId}`,{headers}).subscribe({
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

  pickupLocation:string=''
  dropLocation:string=''
  pickupDate:Date=new Date()
  dropOffDate:Date = new Date()
  handleDeliveryInfo(event:any){
    this.pickupLocation = event.pickupLocation
    this.dropLocation = event.dropLocation
    this.pickupDate = event.pickupDate
    this.dropOffDate = event.dropOffDate
    
    
  }
  /**
   * 
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
      this.paymentId = paymentId
      

    };

    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };

    Razorpay.open(options, successCallback, failureCallback);
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
    const locationInfo = {
      city:"nagpur",
      state:"Maharashtra",
      area:{
        pickup:this.pickupLocation,
        drop:this.dropLocation
      },
      dateTime:{
        pickupDateAndTime:this.pickupDate,
        dropDateAndTime:this.dropOffDate

        
      }

    }
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      Authorization:`Bearer ${this.token}`
    })
    let locationId;
    // call location api and add location and get id from location
    this.http.post('http://localhost:3001/locations/postLocation',locationInfo,{headers}).subscribe({
      next:(response:any)=>{
        locationId = response._id

      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    // call order api and add a order by loaction id in it
    const OrderInfo = {
      userId:this.userId,
      carId:this.carId,
      locationId:locationId,
      totalPrice:150,
      payment:{
        transactionId:this.paymentId,
        paymentDateAndTime: new Date(),
        modeOfPayment:'credit_card',
        totalAmount:150.00,
        status:'successful'


      },
      bookingDateAndTime:new Date()
    }
    this.http.post('http://localhost:3001/orders/placed',OrderInfo,{headers}).subscribe({
      next:(response)=>{
        console.log(response);
        alert("order Placed")
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
}
