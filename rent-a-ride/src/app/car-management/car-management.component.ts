/**
 * Import necessary modules.
 */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Define the component with metadata.
 */
@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html', // Template URL
  styleUrl: './car-management.component.css' // CSS Style URL
})
export class CarManagementComponent { 
  constructor(private router: Router,private http: HttpClient) {}

  /**
   * Array containing car details.
   */
  cars: any[] = [];

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);

    // Check the route and fetch car details only for the relevant route
    if (route === '/admin-car-details') {
      this.fetchCarDetails();
    }
  }

  ngOnInit() {
    this.fetchCarDetails();
  }
  
  fetchCarDetails() {
    // Make the HTTP GET request to the backend API
    this.http.get<any[]>('http://localhost:3001/cars/all').subscribe(
      (response) => {
        this.cars = response;
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }
}
