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
  carList :any;
  ngOnInit(): void {
    this.http.get('http://localhost:3001/cars/all').subscribe({
      next: (response:any)=>{
        console.log(response);
        this.carList = response
      
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}

