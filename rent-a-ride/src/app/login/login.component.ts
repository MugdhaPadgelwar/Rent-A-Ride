import { Component } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Style URL for component
})
export class LoginComponent { 
  signinForm: FormGroup; // Form group for sign-in form

  /**
   * Constructor to initialize form builder and create the sign-in form.
   * @param formBuilder FormBuilder service for building reactive forms
   */
  constructor(private formBuilder: FormBuilder) {
    // Initialize the sign-in form with form controls and validators
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email field with required and email validators
      password: ['', Validators.required], // Password field with required validator
      rememberMe: [false] // Checkbox for "Remember Me" option, initially unchecked
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
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
}
