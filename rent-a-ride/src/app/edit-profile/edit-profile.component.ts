import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  public profile = {
    imageUrl:
      'https://unsplash.com/photos/red-flowers-under-the-blue-sky-1kGvoC9g2DY',
    username: 'John Doe',
    email: 'john.doe@example.com',
    phoneNo: '123-456-7890',
    dob: '1990-01-01',
    gender: 'Male',
    address: '123 Main St',
    city: 'Anytown',
    state: 'Anystate',
    pincode: '123456',
  };

  profileForm!: FormGroup;
  showEditBtn = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      userId: [''],
      username: [this.profile.username, Validators.required],
      email: [this.profile.email, [Validators.required, Validators.email]],
      phoneNo: [this.profile.phoneNo, Validators.required],
      dob: [this.profile.dob],
      gender: [this.profile.gender],
      address: [this.profile.address, Validators.required],
      city: [this.profile.city, Validators.required],
      state: [this.profile.state, Validators.required],
      pincode: [this.profile.pincode, Validators.required],
    });
  }

  editProfile() {
    this.showEditBtn = !this.showEditBtn;
    this.profileForm.enable(); // Enable form fields for editing
  }

  onSubmit() {
    this.showEditBtn = false;
    this.profileForm.disable(); // Disable form fields after submission
  }
}
