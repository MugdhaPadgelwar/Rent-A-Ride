/* Import necessary modules */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';

/**
 * Component for renting a car.
 */
@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.css'],
})
export class RentCarComponent implements OnInit {
  /** Define FormGroup variable for car form */
  carForm!: FormGroup;
  city:any;
  locationId:any;
  token:any;
  /**
   * Constructor with dependency injection of FormBuilder.
   * @param formBuilder FormBuilder instance for building form controls.
   */
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private route:ActivatedRoute,private router:Router) {

  }

  /** Initialize the component */
  ngOnInit(): void {
    /** Create the carForm FormGroup and define form controls with validators */
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
      carInsuranceNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ], // Car insurance number input
    });

    this.route.queryParams.subscribe({
      next:(data:any)=>{
        this.city = data.city
        console.log(this.city);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    this.token = localStorage.getItem('userToken')
    console.log(this.token);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Example header, customize as needed
      Authorization: `Bearer ${this.token}`,
    });
    this.http.get<any[]>(`http://localhost:3001/cities/location?location=${this.city}`,{headers}).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.locationId = response._id

        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  /** Function to handle form submission */
  onSubmit() {
    if (this.carForm.valid) {
      console.log('Form submitted successfully!'); // Log success message if form is valid
      console.log('Form Data:', this.carForm.value); // Log form data
      const userId = localStorage.getItem('userID')
      const carDetails = {
        userId:userId,
        locationId:this.locationId,
        carModel:this.carForm.value.carModel,
        carBrand:this.carForm.value.carBrand,
        carYear:this.carForm.value.carYear,
        carImage:this.carForm.value.carImage,
        carNoPlate:this.carForm.value.carNoPlate,
        carCapacity:this.carForm.value.carCapacity,
        carType:this.carForm.value.carType,
        carFuelType:this.carForm.value.carFuelType,
        carMileage:this.carForm.value.carMileage,
        carPricePerHour:this.carForm.value.carPricePerHour,
        carInsuranceNumber:this.carForm.value.carInsuranceNumber,
        availability:true


      }
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Example header, customize as needed
        Authorization: `Bearer ${this.token}`,
      });
      this.http.post('http://localhost:3001/cars/add',carDetails,{headers}).subscribe({
        next:(response)=>{
          console.log("done");
          alert("Car added successfully")
          this.router.navigate(['/home'])
        },
        error:(err)=>{
          console.log(err);
          alert("there was some problem while posting car")
          
        }
      })


      

    } else {
      console.log('Form is invalid. Please fill all required fields.'); // Log error message if form is invalid
    }
  }

  /**
   * Custom validator function for car number plate.
   * @param control AbstractControl instance representing the form control.
   * @returns Validation result for car number plate.
   */
  validateCarNoPlate(control: AbstractControl): { [key: string]: any } | null {
    const regex = /^[A-Z]{2}\s\d{2}\s[A-Z]{1,2}\s\d{4}$/i; // Regular expression for car number plate format
    return regex.test(control.value) ? null : { invalidCarNoPlate: true }; // Return validation result
  }
}
