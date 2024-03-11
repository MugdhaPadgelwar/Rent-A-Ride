import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  users: any[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', gender: 'Male', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '9876543210', gender: 'Female', age: 25 },
    { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', phone: '4567890123', gender: 'Male', age: 35 },
    { id: 4, name: 'Emily Brown', email: 'emily.brown@example.com', phone: '7890123456', gender: 'Female', age: 28 },
    { id: 5, name: 'William Taylor', email: 'william.taylor@example.com', phone: '2345678901', gender: 'Male', age: 40 },
    { id: 6, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', phone: '8901234567', gender: 'Female', age: 32 },
    { id: 7, name: 'Robert Wilson', email: 'robert.wilson@example.com', phone: '3456789012', gender: 'Male', age: 45 },
    { id: 8, name: 'Emma Davis', email: 'emma.davis@example.com', phone: '9012345678', gender: 'Female', age: 29 },
    { id: 9, name: 'David Martinez', email: 'david.martinez@example.com', phone: '5678901234', gender: 'Male', age: 38 },
    { id: 10, name: 'Olivia Garcia', email: 'olivia.garcia@example.com', phone: '0123456789', gender: 'Female', age: 27 },
  ];
}
