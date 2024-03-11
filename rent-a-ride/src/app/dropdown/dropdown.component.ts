import { Component } from '@angular/core';

/**
 * Component for a dropdown menu.
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'], // Note: Corrected from 'styleUrl' to 'styleUrls'
})
export class DropdownComponent {
  /** Flag indicating whether the dropdown is active or not. */
  dropdownActive = false;

  /**
   * Function to toggle the dropdown menu's visibility.
   */
  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }
}
