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
import { FormsModule } from '@angular/forms';

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
    
  ],
  imports:
   [ FormsModule,BrowserModule, AppRoutingModule, ReactiveFormsModule,  ],
  
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
