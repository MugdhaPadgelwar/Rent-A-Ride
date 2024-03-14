import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Style URL for component
})
export class LoginComponent {
  signinForm: FormGroup; // Form group for sign-in form

  /**
   * Constructor to initialize form builder and create the sign-in form.
   * @param formBuilder FormBuilder service for building reactive forms
   */
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router:Router,private authService:AuthService) {
    // Initialize the sign-in form with form controls and validators
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email field with required and email validators
      password: ['', Validators.required], // Password field with required validator
      rememberMe: [false], // Checkbox for "Remember Me" option, initially unchecked
    });
  }

  /**
   * Method to handle form submission.
   * Logs form data if the form is valid.
   */
  onSubmit() {
    if (this.signinForm.valid) {
      // Log form data if the form is valid
      console.log('Form submitted successfully!');
      console.log('Email:', this.signinForm.value.email);
      console.log('Password:', this.signinForm.value.password);
      console.log('Remember Me:', this.signinForm.value.rememberMe);
      const loginData ={
        email:this.signinForm.value.email,
        password:this.signinForm.value.password
      }
      this.http.post('http://localhost:3001/users/login', loginData).subscribe({
        next: (response: any) => {
          console.log('Signin successful', response);
          const token = response.token;
          const role = response.role
          const userID = response.userId
          console.log(userID);
          
          if (token && role && userID) {
            console.log(token);
            localStorage.setItem('userToken', token);
            localStorage.setItem('role',role)
            localStorage.setItem('userID',userID)
            this.authService.logIn()
            // Navigate to the home page if the token is present
            if(role=='user')
            this.router.navigate(['/home']);
            else{
              this.router.navigate(['/admin'])
            }
          } else {
            // Optionally handle the case where there's no token in the response
            console.log('No token received');
          }
        },
        error: (error) => {
          console.error('Signup failed', error);
        }
      });
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
}
