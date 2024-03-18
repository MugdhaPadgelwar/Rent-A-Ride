import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

 
  constructor(private http: HttpClient) {}

  // Method to check if email exists in the database
  checkEmailExists(email: string): Observable<boolean> {
    // Make a request to your backend API to check if the email exists in the database
    // Replace 'your_api_endpoint' with the actual endpoint to check email existence
    return this.http.get<boolean>(`http://localhost:3001/users/check-email/${email}`);
  }
}
