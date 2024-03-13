import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { CarListingComponent } from './car-listing/car-listing.component';
import { CityComponent } from './city/city.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetComponent } from './reset/reset.component';
import { RentCarComponent } from './renter/renter.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { CarManagementComponent } from './car-management/car-management.component';

const routes: Routes = [
  { path: '', component: CityComponent },
  { path: 'home', component: HomeComponent },
  { path: 'carlisting', component: CarListingComponent },

  {
    path: 'success-page',
    component: BookingSuccessComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  // {
  //   path: '',
  //   component: ForgotPasswordComponent,
  // },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  // {
  //   path: '',
  //   component: ResetComponent,
  // },
  {
    path: 'reset-password/:token',
    component: ResetComponent,
  },
  {
    path: 'renter',
    component: RentCarComponent,
  },
  {
    path: 'detailproduct',
    component: ProductDetailPageComponent,
  },
  {
    path: 'errorpage',
    component: ErrorPageComponent,
  },
  {
    path: 'editprofile',
    component: EditProfileComponent,
  },
  {
    path: 'admin-car-details',
    component: CarManagementComponent,
  },
  {
    path: 'admin-user-details',
    component: UserDetailsComponent,
  },
  {
    path: 'booking-details',
    component: BookingDetailsComponent,
  },
  {
    path: 'transaction-details',
    component: TransactionPageComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  }, 
  {
    path: '**', 
    component: ErrorPageComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
