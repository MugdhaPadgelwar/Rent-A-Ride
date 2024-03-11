/* Importing necessary modules */
import { Component } from '@angular/core';

/* Declaring the component */
@Component({
  /* Component selector */
  selector: 'app-booking-details',
  /* HTML template URL */
  templateUrl: './booking-details.component.html',
  /* CSS style URL */
  styleUrl: './booking-details.component.css'
})
/* Class definition */
export class BookingDetailsComponent {
  /* Booking details data */
  bookings = [
    { userId: 1, carId: 'ABC123', pickUpSpot: 'Location A', pickUpTime: '2024-03-10 09:00:00', dropOffSpot: 'Location B', dropOffTime: '2024-03-12 10:00:00', transactionId: 'T001' },
    { userId: 2, carId: 'DEF456', pickUpSpot: 'Location C', pickUpTime: '2024-03-11 10:00:00', dropOffSpot: 'Location D', dropOffTime: '2024-03-13 11:00:00', transactionId: 'T002' },
    { userId: 3, carId: 'GHI789', pickUpSpot: 'Location E', pickUpTime: '2024-03-12 11:00:00', dropOffSpot: 'Location F', dropOffTime: '2024-03-14 12:00:00', transactionId: 'T003' },
    { userId: 4, carId: 'JKL012', pickUpSpot: 'Location G', pickUpTime: '2024-03-13 12:00:00', dropOffSpot: 'Location H', dropOffTime: '2024-03-15 13:00:00', transactionId: 'T004' },
    { userId: 5, carId: 'MNO345', pickUpSpot: 'Location I', pickUpTime: '2024-03-14 13:00:00', dropOffSpot: 'Location J', dropOffTime: '2024-03-16 14:00:00', transactionId: 'T005' },
    { userId: 6, carId: 'PQR678', pickUpSpot: 'Location K', pickUpTime: '2024-03-15 14:00:00', dropOffSpot: 'Location L', dropOffTime: '2024-03-17 15:00:00', transactionId: 'T006' },
    { userId: 7, carId: 'STU901', pickUpSpot: 'Location M', pickUpTime: '2024-03-16 15:00:00', dropOffSpot: 'Location N', dropOffTime: '2024-03-18 16:00:00', transactionId: 'T007' },
    { userId: 8, carId: 'VWX234', pickUpSpot: 'Location O', pickUpTime: '2024-03-17 16:00:00', dropOffSpot: 'Location P', dropOffTime: '2024-03-19 17:00:00', transactionId: 'T008' },
    { userId: 9, carId: 'YZA567', pickUpSpot: 'Location Q', pickUpTime: '2024-03-18 17:00:00', dropOffSpot: 'Location R', dropOffTime: '2024-03-20 18:00:00', transactionId: 'T009' },
    { userId: 10, carId: 'ZAB890', pickUpSpot: 'Location S', pickUpTime: '2024-03-19 18:00:00', dropOffSpot: 'Location T', dropOffTime: '2024-03-21 19:00:00', transactionId: 'T010' },
    { userId: 11, carId: 'ABC901', pickUpSpot: 'Location U', pickUpTime: '2024-03-20 19:00:00', dropOffSpot: 'Location V', dropOffTime: '2024-03-22 20:00:00', transactionId: 'T011' },
    { userId: 12, carId: 'DEF012', pickUpSpot: 'Location W', pickUpTime: '2024-03-21 20:00:00', dropOffSpot: 'Location X', dropOffTime: '2024-03-23 21:00:00', transactionId: 'T012' },
    { userId: 13, carId: 'GHI123', pickUpSpot: 'Location Y', pickUpTime: '2024-03-22 21:00:00', dropOffSpot: 'Location Z', dropOffTime: '2024-03-24 22:00:00', transactionId: 'T013' },
    { userId: 14, carId: 'JKL234', pickUpSpot: 'Location AA', pickUpTime: '2024-03-23 22:00:00', dropOffSpot: 'Location BB', dropOffTime: '2024-03-25 23:00:00', transactionId: 'T014' },
    { userId: 15, carId: 'MNO345', pickUpSpot: 'Location CC', pickUpTime: '2024-03-24 23:00:00', dropOffSpot: 'Location DD', dropOffTime: '2024-03-26 00:00:00', transactionId: 'T015' },
  ];
}
