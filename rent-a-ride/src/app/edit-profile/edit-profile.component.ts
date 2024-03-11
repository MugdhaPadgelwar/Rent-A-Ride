import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';

/**
 * Component for editing user profile.
 */
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
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
  constructor(private formBuilder: FormBuilder) {}

  /** Lifecycle hook called after component initialization. */
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
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
      dob: ['', Validators.required],
      address: ['', Validators.required],
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

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  /** Function to reset the form. */
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
