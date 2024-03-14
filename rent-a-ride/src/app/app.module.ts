import { FilterPipe } from './pipe/Userfilter.pipe';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { BannerComponent } from './banner/banner.component';
import { CarListingComponent } from './car-listing/car-listing.component';
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetComponent } from './reset/reset.component';
import { SignupComponent } from './signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { RentCarComponent } from './renter/renter.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownComponent } from './dropdown/dropdown.component'; 
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { ModelFilterPipe } from './pipe/Carfilter.pipe';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
// import { AuthGuardService } from './auth-guard-service';



@NgModule({
  declarations: [
    AppComponent,
    EditProfileComponent,
    ProductDetailPageComponent,
    BookingSuccessComponent,
    FeedBackComponent,
    BannerComponent,
    CarListingComponent,
    HomeComponent,
    CityComponent,
    FooterComponent,
    NavbarComponent,
    SearchComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ResetComponent,
    SignupComponent,
    UserDetailsComponent,
    TransactionPageComponent,
    CarManagementComponent,
    BookingDetailsComponent,
    RentCarComponent,
    AdminComponent,
    DropdownComponent,
    ErrorPageComponent,
    MyBookingsComponent,
    SuccessDialogComponent,
    FilterPipe,
    ModelFilterPipe,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    CommonModule,
    
  
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],

  bootstrap: [AppComponent],
})
export class AppModule {}