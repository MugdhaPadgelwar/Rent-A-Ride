/* Import necessary modules */
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/* Component decorator */
@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.css']
})
export class RentCarComponent implements OnInit {
  /* Define FormGroup variable for car form */
  carForm!: FormGroup;

  /* Constructor with dependency injection of FormBuilder */
  constructor(private formBuilder: FormBuilder) { }

  /* Initialize the component */
  ngOnInit(): void {
    /* Create the carForm FormGroup and define form controls with validators */
    this.carForm = this.formBuilder.group({
      carModel: ['', Validators.required], // Car model input
      carBrand: ['', Validators.required], // Car brand input
      carYear: ['', Validators.required], // Car year input
      carImage: ['', Validators.required], // Car image input
      carNoPlate: ['', [Validators.required, this.validateCarNoPlate]], // Car number plate input
      carCapacity: ['', [Validators.required, Validators.pattern(/^(4|5|7)$/)]], // Car capacity input
      carType: ['', Validators.required], // Car type input
      carFuelType: ['', Validators.required], // Car fuel type input
      carMileage: ['', Validators.required], // Car mileage input
      carPricePerHour: ['', Validators.required], // Car price per hour input
      carInsuranceNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]] // Car insurance number input
    });
  }

  /* Function to handle form submission */
  onSubmit() {
    if (this.carForm.valid) {
      console.log('Form submitted successfully!'); // Log success message if form is valid
      console.log('Form Data:', this.carForm.value); // Log form data
    } else {
      console.log('Form is invalid. Please fill all required fields.'); // Log error message if form is invalid
    }
  }

  /* Custom validator function for car number plate */
  validateCarNoPlate(control: AbstractControl): { [key: string]: any } | null {
    const regex = /^[A-Z]{2}\s\d{2}\s[A-Z]{1,2}\s\d{4}$/i; // Regular expression for car number plate format
    return regex.test(control.value) ? null : { 'invalidCarNoPlate': true }; // Return validation result
  }
}
