import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth-service';
/**
 * Component for the navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isSignedUp:Boolean = false

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(loggedIn=>{
      this.isSignedUp = loggedIn
    })
  }
  /** Brand name displayed in the navigation bar. */
  brandName: string = 'Rent-a-Ride';

  /** Current page identifier based on the route. */
  currentPage: string = '';

  /**
   * Constructor to initialize the NavbarComponent.
   * @param router Router instance for navigation events.
   */
  constructor(private router: Router,private authService:AuthService) {
    // Subscribe to router events to update the current page based on the URL
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

  /**
   * Set the current page based on the router's current URL.
   * Invoked during component initialization.
   */
  private setCurrentPageBasedOnCurrentUrl(): void {
    // Use the router's current URL in case the page is refreshed or accessed directly
    this.updateCurrentPageBasedOnUrl(this.router.url);
  }

  /**
   * Update the current page based on the provided URL.
   * @param url The URL to extract the page identifier from.
   */
  private updateCurrentPageBasedOnUrl(url: string): void {
    // Extract the part of the URL after the first slash to use as the page identifier
    const path = url.split('/')[1]; // Assuming your URL structure is simple (e.g., /home, /carlisting)
    switch (path) {
      case '':
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
