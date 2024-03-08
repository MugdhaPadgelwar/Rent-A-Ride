import { NgModule } from '@angular/core';

import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { PreviousBookingComponent } from './previous-booking/previous-booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    EditprofileComponent,
    MyBookingComponent,
    PreviousBookingComponent,
    CheckoutComponent,
    OrderSummaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
