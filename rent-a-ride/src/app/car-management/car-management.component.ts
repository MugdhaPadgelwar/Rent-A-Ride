/**
 * Import necessary modules.
 */
import { Component } from '@angular/core';

/**
 * Define the component with metadata.
 */
@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html', // Template URL
  styleUrl: './car-management.component.css' // CSS Style URL
})
export class CarManagementComponent { 

  /**
   * Array containing car details.
   */
  cars = [
    { userId: 1, carId: 'ABC123', brand: 'Toyota', model: 'Camry', year: 2018, carNoPlate: 'XYZ456', capacity: 5, type: 'Sedan', fuelType: 'Petrol', pricePerHour: '$20' },
    { userId: 2, carId: 'DEF456', brand: 'Honda', model: 'Accord', year: 2019, carNoPlate: 'PQR789', capacity: 5, type: 'Sedan', fuelType: 'Diesel', pricePerHour: '$18' },
    { userId: 3, carId: 'GHI789', brand: 'Ford', model: 'Focus', year: 2020, carNoPlate: 'LMN012', capacity: 4, type: 'Hatchback', fuelType: 'Electric', pricePerHour: '$25' },
    { userId: 4, carId: 'JKL012', brand: 'BMW', model: '3 Series', year: 2017, carNoPlate: 'OPQ345', capacity: 5, type: 'Sedan', fuelType: 'Hybrid', pricePerHour: '$30' },
    { userId: 5, carId: 'MNO345', brand: 'Chevrolet', model: 'Cruze', year: 2016, carNoPlate: 'RST678', capacity: 5, type: 'Sedan', fuelType: 'Petrol', pricePerHour: '$22' },
    { userId: 6, carId: 'PQR678', brand: 'Hyundai', model: 'Elantra', year: 2019, carNoPlate: 'UVW901', capacity: 5, type: 'Sedan', fuelType: 'Diesel', pricePerHour: '$19' },
    { userId: 7, carId: 'STU901', brand: 'Mercedes-Benz', model: 'E-Class', year: 2020, carNoPlate: 'XYZ234', capacity: 5, type: 'Sedan', fuelType: 'Petrol', pricePerHour: '$35' },
    { userId: 8, carId: 'VWX234', brand: 'Audi', model: 'A4', year: 2019, carNoPlate: 'ABC567', capacity: 5, type: 'Sedan', fuelType: 'Electric', pricePerHour: '$28' },
    { userId: 9, carId: 'YZA567', brand: 'Volvo', model: 'S60', year: 2018, carNoPlate: 'DEF890', capacity: 5, type: 'Sedan', fuelType: 'Hybrid', pricePerHour: '$32' },
    { userId: 10, carId: 'ZAB890', brand: 'Subaru', model: 'Legacy', year: 2017, carNoPlate: 'GHI123', capacity: 5, type: 'Sedan', fuelType: 'Petrol', pricePerHour: '$24' }
  ];

}
