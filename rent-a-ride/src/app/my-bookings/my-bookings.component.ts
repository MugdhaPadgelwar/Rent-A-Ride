import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Booking {
  id: string,
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
        booking.id = booking._id;
        return booking;
        
      });
    }, (error) => {
      console.error('Error fetching bookings:', error);
    });
  }

  cancelBooking(booking: Booking): void {
    const bookingId = booking.id; // Assuming bookingId is available in the Booking interface
    const token = localStorage.getItem('userToken');
  
    if (!token) {
      console.error('User token not available');
      return;
    }
  
    this.http.delete<any>(`http://localhost:3001/orders/cancel?orderId=${bookingId}`, { 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).subscribe(
      (response) => {
        console.log('Booking Canceled:', booking);
        // Assuming you want to remove the canceled booking from the UI
        this.bookings = this.bookings.filter(b => b.id !== booking.id);
      },
      (error) => {
        console.error('Error canceling booking:', error);
      }
    );
  }
}
