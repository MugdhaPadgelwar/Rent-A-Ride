import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  brandName: string = 'Rent-a-Ride';
  currentPage: string = ''; // Initialize without a default to set based on the route

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.updateCurrentPageBasedOnUrl(event.urlAfterRedirects);
      });

    // Set initial currentPage based on the current URL
    this.setCurrentPageBasedOnCurrentUrl();
  }

  private setCurrentPageBasedOnCurrentUrl(): void {
    // Use the router's current URL in case the page is refreshed or accessed directly
    this.updateCurrentPageBasedOnUrl(this.router.url);
  }

  private updateCurrentPageBasedOnUrl(url: string): void {
    // Extract the part of the URL after the first slash to use as the page identifier
    const path = url.split('/')[1]; // Assuming your URL structure is simple (e.g., /home, /carlisting)
    switch (path) {
      case ' ':
        this.currentPage = 'city'; // Assuming the root path ('/') is your home page
        break;
      case 'carlisting':
        this.currentPage = 'carlisting';
        break;
      case 'signup':
        this.currentPage = 'signup';
        break;
      default:
        this.currentPage = ''; // Or set a default/fallback value
        break;
    }
  }
}
