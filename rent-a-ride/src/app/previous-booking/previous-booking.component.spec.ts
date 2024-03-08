import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousBookingComponent } from './previous-booking.component';

describe('PreviousBookingComponent', () => {
  let component: PreviousBookingComponent;
  let fixture: ComponentFixture<PreviousBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviousBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
