/**
 * Import necessary modules.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  token:string|null = localStorage.getItem('userToken');
  constructor(private router: Router,private http: HttpClient) {}
  /**
   * Array containing user details.
   */
  users: any= [];

  searchText: string = '';

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);

    // Check the route and fetch user details only for the relevant route
    if (route === '/admin-user-details') {
      this.fetchUserDetails();
      console.log(this.users);
      
    }
  }

  // This method is called whenever the user changes the search text
  onSearchChange(): void {
    this.filterUsers();
  }

  ngOnInit() {
    this.fetchUserDetails();
    // this.token = localStorage.getItem('userToken');
  // console.log(token);
  }

  // Add filterUsers method to filter the users array
  filterUsers(): void {
    if (this.searchText) {
      this.users = this.users.filter((user: any) =>
        user.userName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.fetchUserDetails(); // Reset the users array to the original list when search text is empty
    }
  }

  fetchUserDetails() {
    // Get the authorization token from localStorage

    

    // Check if the token exists
    if (this.token) {
      console.log(this.token);
      
      // Include the token in the headers
      const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Example header, customize as needed
      'Authorization': `Bearer ${this.token}`
      })
        
      

      // Make the HTTP GET request to the backend API for fetching user details
      this.http.get<any[]>('http://localhost:3001/admin/users/list',{headers}).subscribe(
        (response) => {
          // Update your users array or perform any necessary logic with the response
          console.log('User details:', response);
          this.users = this.searchText ? this.filterUsers() : response;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
    else {
      console.error('Authorization token not found.');
    }
  }
}
