import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { CarListingComponent } from './car-listing/car-listing.component'; // Adjust the path
import { CityComponent } from './city/city.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'carlisting', component: CarListingComponent },

  { path: '', component: CityComponent },

  {
    path: 'success-page',
    component: BookingSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
