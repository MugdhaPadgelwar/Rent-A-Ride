import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { CarListingComponent } from './car-listing/car-listing.component'; // Adjust the path
import { CityComponent } from './city/city.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  { path: '', component: CityComponent },
  { path: 'home', component: HomeComponent },
  { path: 'carlisting', component: CarListingComponent },

  {
    path: 'success-page',
    component: BookingSuccessComponent,
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: '',
    component: ForgotPasswordComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: '',
    component: ResetComponent,
  },
  {
    path: 'reset-password/:token',
    component: ResetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
