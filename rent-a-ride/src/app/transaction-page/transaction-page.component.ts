/**
 * Import necessary modules.
 */
import { Component } from '@angular/core';

/**
 * Define the component with metadata.
 */
@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html', // Template URL
  styleUrl: './transaction-page.component.css' // CSS Style URL
})
export class TransactionPageComponent { 

  /**
   * Array containing transaction details.
   */
  transactions: any[] = [
    { userId: 1, carId: 'ABC123', transactionId: 'T001', transactionMode: 'Online', status: 'Completed', dateTime: '2022-01-01 12:00:00' },
    { userId: 2, carId: 'DEF456', transactionId: 'T002', transactionMode: 'Offline', status: 'Pending', dateTime: '2022-02-05 09:30:00' },
    { userId: 3, carId: 'GHI789', transactionId: 'T003', transactionMode: 'Online', status: 'Failed', dateTime: '2022-03-10 15:45:00' },
    { userId: 4, carId: 'JKL012', transactionId: 'T004', transactionMode: 'Offline', status: 'Completed', dateTime: '2022-04-15 18:20:00' },
    { userId: 5, carId: 'MNO345', transactionId: 'T005', transactionMode: 'Online', status: 'Pending', dateTime: '2022-05-20 11:10:00' },
    { userId: 6, carId: 'PQR678', transactionId: 'T006', transactionMode: 'Offline', status: 'Completed', dateTime: '2022-06-25 14:55:00' },
    { userId: 7, carId: 'STU901', transactionId: 'T007', transactionMode: 'Online', status: 'Failed', dateTime: '2022-07-30 16:30:00' },
    { userId: 8, carId: 'VWX234', transactionId: 'T008', transactionMode: 'Offline', status: 'Completed', dateTime: '2022-08-05 10:45:00' },
    { userId: 9, carId: 'YZA567', transactionId: 'T009', transactionMode: 'Online', status: 'Pending', dateTime: '2022-09-10 13:20:00' },
    { userId: 10, carId: 'BCD890', transactionId: 'T010', transactionMode: 'Offline', status: 'Completed', dateTime: '2022-10-15 17:00:00' }
  ];

}
