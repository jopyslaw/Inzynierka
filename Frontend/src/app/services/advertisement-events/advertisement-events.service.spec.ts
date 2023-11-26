import { TestBed } from '@angular/core/testing';
import { AdvertisementEventsService } from './advertisement-events.service';

describe('AdvertisementEventsService', () => {
  let service: AdvertisementEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
