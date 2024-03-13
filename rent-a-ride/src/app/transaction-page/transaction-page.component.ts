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
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html', // Template URL
  styleUrl: './transaction-page.component.css' // CSS Style URL
})
export class TransactionPageComponent { 
  token: string | null = localStorage.getItem('userToken');
  transactions: any = [];

  constructor(private router: Router, private http: HttpClient) {}


  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);

    // Check the route and fetch transaction details only for the relevant route
    if (route === '/admin-transaction-details') {
      this.fetchTransactionDetails();
      console.log(this.transactions);
    }
  }

  ngOnInit() {
    this.fetchTransactionDetails();
  }

  fetchTransactionDetails() {
    // Check if the token exists
    if (this.token) {
      // Include the token in the headers
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Example header, customize as needed
        Authorization: `Bearer ${this.token}`,
      });

      // Make the HTTP GET request to the backend API for fetching transaction details
      this.http.get<any[]>('http://localhost:3001/orders/allorders', { headers }).subscribe(
        (response) => {
          // Update your transactions array or perform any necessary logic with the response
          console.log('Transaction details:', response);
          this.transactions = response;
        },
        (error) => {
          console.error('Error fetching transaction details:', error);
        }
      );
    } else {
      console.error('Authorization token not found.');
    }
  }
}
