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
  selector: 'app-user-details',
  templateUrl: './user-details.component.html', // Template URL
  styleUrl: './user-details.component.css' // CSS Style URL
})
export class UserDetailsComponent {
  constructor(private router: Router,private http: HttpClient) {}
  /**
   * Array containing user details.
   */
  users: any[] = [];

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);

    // Check the route and fetch user details only for the relevant route
    if (route === '/admin-user-details') {
      this.fetchUserDetails();
      console.log(this.users);
      
    }
  }

  ngOnInit() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    // Make the HTTP GET request to the backend API for fetching user details
    this.http.get<any[]>('http://localhost:3001/admin/users/list').subscribe(
      (response) => {
        // Update your users array or perform any necessary logic with the response
        console.log('User details:', response);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
