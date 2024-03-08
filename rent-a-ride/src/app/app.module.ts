import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    ForgetPasswordComponent,
    TransactionPageComponent,
    UserDetailsComponent,
    CarManagementComponent,
    LoginComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
