import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  userId: string | null = localStorage.getItem('userID');
  userName: string = '';

  constructor(private http: HttpClient,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.fetchUserDetails();
    }
  }

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);
  }

  logOut():void{
    this.authService.logOut(); // Call the logOut method from your AuthService
    this.router.navigate(['/']); // Redirect to the home page
  }

  fetchUserDetails(): void {
    // Make an HTTP request to fetch user details using the userId
    // Replace 'http://example.com/user-details' with your API endpoint
    this.http.get<any>('http://localhost:3001/users/user_id?userId=' + this.userId).subscribe(
      (response) => {
        this.userName = response.userName; // Assuming the response contains the user's name
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
