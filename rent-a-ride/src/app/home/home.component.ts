import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  constructor(private route:ActivatedRoute ){}
  city:any;
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next:(response:any)=>{
        this.city = response.city
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
