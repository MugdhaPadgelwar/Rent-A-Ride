import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  token: string | null = localStorage.getItem('userToken');
  userId: string | null = localStorage.getItem('userID');

  constructor(private http: HttpClient) { }

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
}
