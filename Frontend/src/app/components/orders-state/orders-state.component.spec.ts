import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersStateComponent } from './orders-state.component';

describe('OrdersStateComponent', () => {
  let component: OrdersStateComponent;
  let fixture: ComponentFixture<OrdersStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
