// city.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  selectedCity: string = '';
  showError: boolean = false;

  cities: any[] = [
    { value: '', label: 'Select a City' },
    { value: 'nagpur', label: 'Nagpur, Maharashtra' },
    { value: 'bangalore', label: 'Bangalore, Karnataka' },
    { value: 'hyderabad', label: 'Hyderabad, Telangana' }
  ];

  constructor() {}

  checkValidation(): void {
    if (this.selectedCity === '' ) {
      console.log("Please select the city");
    } else {
      this.showError = false;
      console.log('Selected City:', this.selectedCity);
    }
  }
}
