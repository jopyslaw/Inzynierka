import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateItemComponent } from './order-state-item.component';

describe('OrderStateItemComponent', () => {
  let component: OrderStateItemComponent;
  let fixture: ComponentFixture<OrderStateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
