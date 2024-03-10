import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { apiUrls } from './api-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {} 
   
  register(username: string, email: string, password: string): Observable<any> {
    const url = `${apiUrls.authServiceApi}/register`;
    const body = { username, email, password };
    return this.http.post(url, body);
  }

  // Send email request
  sendEmailService(email: string): Observable<any> {
    // Define the endpoint URL for sending email
    const endpoint = `${apiUrls.authServiceApi}/forget-password`;

    // Send the HTTP POST request to the backend API with the email in the request body
    return this.http.post<any>(endpoint, { email });
  }

 // Reset password request
resetPasswordService(resetObj: any): Observable<any> {
    // Define the endpoint URL for resetting password
    const endpoint = `${apiUrls.authServiceApi}/reset-password`;
  
    // Send the HTTP POST request to the backend API with the reset object in the request body
    return this.http.post<any>(endpoint, resetObj);
  }
}
