import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAccountComponent } from './admin-add-account.component';

describe('AdminAddAccountComponent', () => {
  let component: AdminAddAccountComponent;
  let fixture: ComponentFixture<AdminAddAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
