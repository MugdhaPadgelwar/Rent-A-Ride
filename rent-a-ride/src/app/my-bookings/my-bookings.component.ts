import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Booking {
  carBrand: string;
  carModel: string;
  carYear: number;
  carNoPlate: string;
  carCapacity: string;
  carType: string;
  carFuelType: string;
  carPricePerHour: string;
  totalPrice: string;
  image: string;
  carDetails?: CarDetails; // Define carDetails property
}

interface CarDetails {
  carBrand: string;
  carModel: string;
  carYear: number;
  carNoPlate: string;
  carCapacity: string;
  carType: string;
  carFuelType: string;
  carPricePerHour: string;
  totalPrice: string;
  image: string;
}

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    const userId = localStorage.getItem('userID');
    const token = localStorage.getItem('userToken');

    if (!userId || !token) {
      console.error('User ID or token not available');
      return;
    }

    const bookingUrl = `http://localhost:3001/orders/mybookings?userId=${userId}`;
    this.http.get<any>(bookingUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).subscribe((response: any) => {
      if (!response.success) {
        console.error('Error fetching bookings:', response.message);
        return;
      }

      this.bookings = response.bookings.map((booking: any) => {
        const carId = booking.carId;
        console.log(carId);
        
        const headers = new HttpHeaders({
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        })
        if(carId){
          this.http.get(`http://localhost:3001/cars/carbyid?_id=${carId}`,{headers}).subscribe({
            next:(response:any)=>{
              booking.carDetails = response
              console.log(booking);
              
            },
            error:(er)=>{
              console.log(er);
              
            }
          })
        }
        // if (carId) {
        //   const carUrl = `http://localhost:3001/cars/carbyid?_id=${carId}`; 

        //   this.http.get<any>(carUrl,{
        //     headers: {
        //       'Authorization': `Bearer ${token}`,
        //       'Content-Type': 'application/json'
        //     }
        //   }).subscribe((carResponse: any) => {
        //     booking.carDetails = carResponse;
        //   });
        // }
        
        console.log(booking);
        return booking;
        
      });
    }, (error) => {
      console.error('Error fetching bookings:', error);
    });
  }

  cancelBooking(booking: any): void {
    // Implement cancellation logic here
    console.log('Booking canceled:', booking);
  }

  giveFeedback(booking: any): void {
    // Implement feedback logic here
    console.log('Feedback provided for booking:', booking);
  }
}
