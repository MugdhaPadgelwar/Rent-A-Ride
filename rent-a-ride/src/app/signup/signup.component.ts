/**
 * Signup Component
 *
 * This component is responsible for handling the signup form.
 * It validates user inputs for username, email, and password fields.
 */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  /**
   * Constructor
   *
   * Initializes the signup form with validators for username, email, and password fields.
   * @param formBuilder FormBuilder instance for creating the form group
   */
  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          (control: { value: any }) => {
            const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/; // Start with letter, followed by letters or numbers
            const valid = usernameRegex.test(control.value); // Check if username follows the pattern
            if (control.value.length > 0 && control.value.startsWith('_')) {
              return { invalidUsername: true }; // Return error if the username starts with an underscore
            }
            return valid ? null : { invalidUsername: true }; // Return error if the username is not valid
          },
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200),
          (control: { value: any }) => {
            const passwordRegex =
              /^(?=.*[A-Z])(?=.*[!@#$%^&()])(?=.*[0-9])(?!.*\s)(?!.*(\d)\1)/;
            return passwordRegex.test(control.value)
              ? null
              : { invalidPassword: true };
          },
        ],
      ],
    });
  }

  /**
   * onSubmit
   *
   * Handles form submission.
   * Logs success message if the form is valid, otherwise logs error message.
   */
  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }

  /**
   * showAlert
   *
   * Displays an alert if the form is invalid.
   */
  showAlert() {
    if (this.signupForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}
