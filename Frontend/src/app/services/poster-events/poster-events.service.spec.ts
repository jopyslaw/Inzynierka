import { TestBed } from '@angular/core/testing';

import { PosterEventsService } from './poster-events.service';

describe('PosterEventsService', () => {
  let service: PosterEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosterEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
