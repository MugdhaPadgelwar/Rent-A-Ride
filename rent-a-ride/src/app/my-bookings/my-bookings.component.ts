import { Component,OnInit } from '@angular/core';    
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  token: string | null = localStorage.getItem('userToken');
  userId: string | null = localStorage.getItem('userID');
  bookings: any[] = []; // Assuming you have a Booking model defined

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Assuming you fetch bookings data from a service or API
    this.fetchBookings();
  } 
  async fetchBookings() {
    try {
      // Fetch bookings for the user
      const url = `http://localhost:3001/orders/mybookings?userId=${this.userId}`;
      const response = await this.http.get<any>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        }),
      }).toPromise();

      // Check if response is undefined or not an array
      if (!Array.isArray(response)) {
        throw new Error('Response is not an array');
      }

      return response;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
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