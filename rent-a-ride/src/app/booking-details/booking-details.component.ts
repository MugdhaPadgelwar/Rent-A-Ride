/* Importing necessary modules */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Declaring the component */
@Component({
  /* Component selector */
  selector: 'app-booking-details',
  /* HTML template URL */
  templateUrl: './booking-details.component.html',
  /* CSS style URL */
  styleUrl: './booking-details.component.css'
})
/* Class definition */
export class BookingDetailsComponent {
  token: string | null = localStorage.getItem('userToken');
  constructor(private router: Router, private http: HttpClient) {}

  /* Booking details data */
  bookings: any[] = [];
  locations: any[] = [];

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);

    // Check the route and fetch booking and location details only for the relevant route
    if (route === '/admin-booking-details') {
      this.fetchBookingDetails();
      this.fetchLocationDetails();
    }
  }

  ngOnInit() {
    this.fetchBookingDetails();
    this.fetchLocationDetails();
  }

  fetchBookingDetails() {
    // Check if the token exists
    if (this.token) {
      // Include the token in the headers
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Example header, customize as needed
        Authorization: `Bearer ${this.token}`,
      });

      // Make the HTTP GET request to the backend API for fetching booking details
      this.http.get<any[]>('http://localhost:3001/orders/allorders', { headers }).subscribe(
        (response) => {
          // Update your bookings array or perform any necessary logic with the response
          console.log('Booking details:', response);
          this.bookings = response;
        },
        (error) => {
          console.error('Error fetching booking details:', error);
        }
      );
    } else {
      console.error('Authorization token not found.');
    }
  }

  fetchLocationDetails() {
    // Check if the token exists
    if (this.token) {
      // Include the token in the headers
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Example header, customize as needed
        Authorization: `Bearer ${this.token}`,
      });

      // Make the HTTP GET request to the backend API for fetching location details
      this.http.get<any[]>('http://localhost:3001/locations/getAllLocations', { headers }).subscribe(
        (response) => {
          // Update your locations array or perform any necessary logic with the response
          console.log('Location details:', response);
          this.locations = response;
        },
        (error) => {
          console.error('Error fetching location details:', error);
        }
      );
    } else {
      console.error('Authorization token not found.');
    }
  }
}
