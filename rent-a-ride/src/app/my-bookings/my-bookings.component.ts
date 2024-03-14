import { Component,OnInit } from '@angular/core';   

interface Booking {
  brand: string;
  model: string;
  year: number;
  carNoPlate: string;
  capacity: string;
  type: string;
  fuelType: string;
  pricePerHour: string;
  totalPrice: string;
  image: string;
}



@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = []; // Assuming you have a Booking model defined

  constructor() { }

  ngOnInit(): void {
    // Assuming you fetch bookings data from a service or API
    this.bookings = [
      {
        brand: 'Toyota',
        model: 'Camry',
        year: 2023,
        carNoPlate: 'ABC123',
        capacity: '5-seater',
        type: 'SUV',
        fuelType: 'Petrol',
        pricePerHour: '$50',
        totalPrice: '$200',
        image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80'
      },
      {
        brand: 'Honda',
        model: 'Accord',
        year: 2022,
        carNoPlate: 'XYZ456',
        capacity: '4-seater',
        type: 'Sedan',
        fuelType: 'Diesel',
        pricePerHour: '$40',
        totalPrice: '$160',
        image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80'
      }
      // Add more booking objects as needed
    ];
  }

  cancelBooking(booking: Booking): void {
    // Implement cancellation logic here
    console.log('Booking canceled:', booking);
  }

  giveFeedback(booking: Booking): void {
    // Implement feedback logic here
    console.log('Feedback provided for booking:', booking);
  }
}