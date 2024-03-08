// Importing necessary Angular modules
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Initializing variables for user input
  userName: string = '';
  email: string = '';
  password: string = '';

  // Variables to track validation errors
  usernameRequiredError: boolean = false;
  usernameFormatError: boolean = false;
  startsWithUnderscoreError: boolean = false;
  emailRequiredError: boolean = false;
  emailPatternError: boolean = false;
  endsWithDotComError: boolean = false;
  passwordRequiredError: boolean = false;
  minLengthError: boolean = false;
  maxLengthError: boolean = false;
  missingSpecialCharError: boolean = false;
  missingCapitalLetterError: boolean = false;
  consecutiveNumbersError: boolean = false;

  // Function to validate User Name field
  validateUsername() {
    this.usernameRequiredError = this.userName.trim() === '';
    this.usernameFormatError = !this.userName.match(/^[^\d_][a-zA-Z0-9_]{3,19}$/);
    this.startsWithUnderscoreError = this.userName.startsWith('_');
  }

  // Function to validate Email field
  validateEmail() {
    this.emailRequiredError = this.email.trim() === '';
    this.emailPatternError = !this.email.match(/^[a-zA-Z]+\d+@gmail\.com$/);
    this.endsWithDotComError = !this.email.endsWith('.com');
  }

  // Function to validate Password field
  validatePassword() {
    this.passwordRequiredError = this.password.trim() === '';
    this.minLengthError = this.password.length < 8;
    this.maxLengthError = this.password.length > 20;
    this.missingSpecialCharError = !/[!@#$%^&*]/.test(this.password);
    this.missingCapitalLetterError = !/[A-Z]/.test(this.password);
    this.consecutiveNumbersError = /(\d{3})/.test(this.password);
  }

  // Function to check overall form validity
  isFormValid() {
    return (
      !this.usernameRequiredError &&
      !this.usernameFormatError &&
      !this.startsWithUnderscoreError &&
      !this.emailRequiredError &&
      !this.emailPatternError &&
      !this.endsWithDotComError &&
      !this.passwordRequiredError &&
      !this.minLengthError &&
      !this.maxLengthError &&
      !this.missingSpecialCharError &&
      !this.missingCapitalLetterError &&
      !this.consecutiveNumbersError
    );
  }

  // Function to check if the Register button should be disabled
  isButtonDisabled() {
    return !this.isFormValid();
  }

  // Function to handle form submission
  submitForm() {
    if (this.isFormValid()) {
      // Handle form submission
      console.log('Form submitted successfully!');
    } else {
      console.log('Form submission failed. Please check the errors.');
    }
  }
}


