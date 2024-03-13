import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component for a dropdown menu.
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'], // Note: Corrected from 'styleUrl' to 'styleUrls'
})
export class DropdownComponent {
  constructor(private router: Router) {}
  /** Flag indicating whether the dropdown is active or not. */
  dropdownActive = false;

  /**
   * Function to toggle the dropdown menu's visibility.
   */
  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);
  }
}
