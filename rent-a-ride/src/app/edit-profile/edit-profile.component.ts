import { SuccessDialogComponent } from './../success-dialog/success-dialog.component';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * Component for editing user profile.
 */
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  token: string | null = localStorage.getItem('userToken');

  /** User ID extracted from the token */
  userId: string | null = localStorage.getItem('userID');
  
  /**
   * Validator function to allow only digits in the input.
   * @returns Validator function for checking if the input contains only digits.
   */
  onlyDigits(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && !/^\d+$/.test(value)) {
        return { onlyDigits: true };
      }
      return null;
    };
  }

  /** Form group for user profile edit form. */
  form: FormGroup = new FormGroup({});

  /** Flag to indicate if the form has been submitted. */
  submitted = false;

  /**
   * Constructor to initialize the EditProfileComponent.
   * @param formBuilder FormBuilder instance for building form controls.
   */
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private dialog: MatDialog,private router: Router) {}

  /** Lifecycle hook called after component initialization. */
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      phoneno: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          this.onlyDigits(),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  /**
   * Getter method to access form controls.
   * @returns Object containing form controls.
   */
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  /** Function to handle form submission. */
  onSubmit(): void {
    this.submitted = true;
    console.log('Submit button clicked');

    if (this.form.invalid) {
      console.log('Form is invalid',this.form);
      return;
    }

    console.log('Form is valid. Submitting...');
    // Prepare the data to send to the update API
    const updateData = {
      userName: this.f['username'].value,
      mobileNumber: this.f['phoneno'].value,
      email: this.f['email'].value,
      gender: this.f['gender'].value,
      address: {
        city: this.f['city'].value,
        state: this.f['state'].value,
        pincode: this.f['zip'].value, // Assuming 'zip' corresponds to 'pincode'
      },
    };

    // Make the update API call
    this.http
      .put<any>(`http://localhost:3001/users/update?userId=${this.userId}`, updateData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        }),
      })
      .subscribe(
        (response) => {
          console.log('Update successful:', response);
          this.openSuccessDialog();
        },
        (error) => {
          console.error('Update failed:', error);
          // Handle error (if needed)
        }
      );
  }

  /** Function to reset the form. */
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent);
    setTimeout(() => {
      dialogRef.close();
      this.router.navigate(['/home']); // Replace '/previous-page' with your desired route
    }, 3000);
  }
}
