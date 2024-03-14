import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

interface Car {
  id: string,
  brand: string;
  model: string;
  year: number;
  carNoPlate: string;
  capacity: number;
  type: string;
  fuelType: string;
  pricePerHour: string;
  image: string;
}


@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.css'
})
export class MyCarsComponent implements OnInit {
  token: string | null = localStorage.getItem('userToken');
  cars: Car[] = []; // Assuming you have a Booking model defined

  constructor(private http: HttpClient) {
   }

  ngOnInit(){
    const userId = localStorage.getItem('userID');
    
    if (userId) {
      this.fetchCars(userId);
      
    }
  }

  fetchCars(userId: string): void {
    this.http.get<any[]>(`http://localhost:3001/cars/carbyuserid?userId=${userId}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    }).subscribe(
      (response: any[]) => {
        this.cars = response.map((car: any) => ({
          id:car._id,
          brand: car.carBrand,
          model: car.carModel,
          year: car.carYear,
          carNoPlate: car.carNoPlate,
          capacity: car.carCapacity,
          type: car.carType,
          fuelType: car.carFuelType,
          pricePerHour: car.carPricePerHour,
          image: car.carImage
        }));
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  cancelCars(car: Car): void {
    const carId = car.id; // Assuming carId is available in the Car interface
    console.log(carId);
    
    this.http.delete<any>(`http://localhost:3001/cars/deleteCars?carId=${carId}`, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }), }).subscribe(
    (response) => {
      console.log('Car Deleted:', car);
      // Assuming you want to remove the deleted car from the UI
      this.cars = this.cars.filter(c => c.id !== car.id);
    },
    (error) => {
      console.error('Error deleting car:', error);
    }
  );
  }
}
