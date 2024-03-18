import { TestBed } from '@angular/core/testing';

import { GoogleMapApiService } from './google-map-api.service';

describe('GoogleMapApiService', () => {
  let service: GoogleMapApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
