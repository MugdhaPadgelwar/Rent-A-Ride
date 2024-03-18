// car-listing.component.ts

// car-listing.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.css']
})

export class CarListingComponent implements OnInit {
  selectedBrand: string = "all"
  selectedMode: string = "all"
  selectedMileage: string = "all"
  selectedYear:string="all"

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get('http://localhost:3001/cars/all').subscribe({
      next: (response: any) => {

        // Filter to get only available cars
        this.carList = response.filter((car: any) => car.availability === true);

        // Apply filters based on initial or default filter values
        this.applyFilters();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilters(): void {
    console.log("Selected brand: " + this.selectedBrand);
    console.log("Selected mode: " + this.selectedMode);
    console.log("Selected mileage: " + this.selectedMileage);
    console.log("Selected Year: " + this.selectedYear);
    console.log("Original car list:");


    this.filteredCarList = this.carList.filter((car: any) => {
      // Check if carBrand, carType, and carMileage are defined
      if (!car.carBrand || !car.carType || !car.carMileage) {
        console.log("Car brand, mode, or mileage is not defined:", car);
        return false;
      }

      // Convert selected brand, mode, and mileage to lowercase
      const selectedBrandLower = this.selectedBrand.trim().toLowerCase();
      const selectedModeLower = this.selectedMode.trim().toLowerCase();
      const selectedMileageLower = this.selectedMileage.trim().toLowerCase();
      const selectedYearLower=this.selectedYear.trim().toLowerCase();
      console.log("selected " + selectedMileageLower);

      // Convert car brand, mode, and mileage to lowercase
      const carBrandLower = car.carBrand.trim().toLowerCase();
      const carModeLower = car.carType.trim().toLowerCase();
      const carMileageLower: number = car.carMileage
      const carYear:number=car.carYear
      console.log("the car Year is " + carYear)
      console.log("the car mileage is " + carMileageLower)

      // Filter by brand
      if (selectedBrandLower !== 'all' && carBrandLower !== selectedBrandLower) {
        console.log("Excluding car with brand: " + car.carBrand);
        return false;
      }

      // Filter by mode
      if (selectedModeLower !== 'all' && carModeLower !== selectedModeLower) {
        console.log("Excluding car with mode: " + car.carType);
        return false;
      }

      // Filter by mileage
      // Filter by mileage
      if (selectedYearLower !== "all") {
        if (selectedYearLower === "less10" && carMileageLower <= 10) {
          console.log("Excluding car with mileage less than 10");
          return true;
        }
        if (selectedYearLower === "10-20" && !(carMileageLower >= 10 && carMileageLower <= 20)) {
          console.log("Excluding car with mileage outside the range of 10 and 20");
          return false;
        }
      }

      //By Year
      if (selectedYear !== "all") {
        if (selectedMileageLower === "2015" && !(carYear == 2015)) {
          console.log("Excluding car with mileage Year is 2015");
          return false;
        }
        if (selectedMileageLower === "2016" && !(carMileageLower==2016)) {
          console.log("car Year is 2016");
          return false;
        }
      }

      return true;
    });

    console.log("Filtered car list:");
    console.log(this.filteredCarList);
  }


  filteredCarList: any = [
    {
      id: 1,
      brand: 'Mercedes ',
      year: 2015,
      mode: 'AUTO',
      mileage: '25K',
      price: "99.00/hr",
      image: './assets/car-rent-1.png'
    }
  ]

  carList: any = [
    {
      id: 1,
      brand: 'Mercedes ',
      year: 2015,
      mode: 'AUTO',
      mileage: '25K',
      price: "99.00/hr",
      image: './assets/car-rent-1.png'
    },
    {
      id: 2,
      brand: 'Audi',
      year: 2018,
      mode: 'Manual',
      mileage: '15K',
      price: "120.00/hr",
      image: './assets/car-rent-2.png'
    },
    {
      id: 3,
      brand: 'Hyundai',
      year: 2016,
      mode: 'AUTO',
      mileage: '20K',
      price: "110.00/hr",
      image: './assets/car-rent-3.png'
    },
    {
      id: 4,
      brand: 'Hyundai',
      year: 2017,
      mode: 'Manual',
      mileage: '18K',
      price: "105.00/hr",
      image: './assets/car-rent-4.png'
    },
    {
      id: 5,
      brand: 'Audi',
      year: 2019,
      mode: 'AUTO',
      mileage: '22K',
      price: "115.00/hr",
      image: './assets/car-rent-5.png'
    },
    {
      id: 6,
      brand: 'Audi',
      year: 2020,
      mode: 'Manual',
      mileage: '12K',
      price: "130.00/hr",
      image: './assets/car-rent-6.png'
    },
    // Add more car objects as needed
  ];
}

