// car-listing.component.ts

// car-listing.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.css']
})
export class CarListingComponent implements OnInit {

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get('http://localhost:3001/cars/all').subscribe({
      next:(response:any)=>{
        console.log(response);
        
        this.carList = response.filter((car: any) => car.availability === true );
      
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }
  carList:any = [
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

