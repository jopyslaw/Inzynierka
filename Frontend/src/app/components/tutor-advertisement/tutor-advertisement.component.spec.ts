import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAdvertisementComponent } from './tutor-advertisement.component';

describe('TutorAdvertisementComponent', () => {
  let component: TutorAdvertisementComponent;
  let fixture: ComponentFixture<TutorAdvertisementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorAdvertisementComponent]
    });
    fixture = TestBed.createComponent(TutorAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
