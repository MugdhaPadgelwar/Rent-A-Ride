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

  searchText: string = '';

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);

    // Check the route and fetch car details only for the relevant route
    if (route === '/admin-car-details') {
      this.fetchCarDetails();
    }
  }

  // This method is called whenever the user changes the search text
  onSearchChange(): void {
    this.filterCars();
  }

  ngOnInit() {
    this.fetchCarDetails();
  }
  
  // Add filterUsers method to filter the users array
  filterCars(): void {
    if (this.searchText) {
      this.cars = this.cars.filter((car: any) =>
        car.carModel.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      // If searchText is empty, reset the cars array to the original list
      this.fetchCarDetails();
    }
  }

  fetchCarDetails() {
    this.http.get<any[]>('http://localhost:3001/cars/all').subscribe(
      (response) => {
        // Assign response to cars array
        this.cars = response;
        // Filter cars if searchText is not empty
        if (this.searchText) {
          this.filterCars();
        }
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }
}
