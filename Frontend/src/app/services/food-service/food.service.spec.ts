import { TestBed } from '@angular/core/testing';

import { AddOfferService } from './food.service';

describe('AddOfferService', () => {
  let service: AddOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
