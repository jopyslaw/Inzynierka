import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders-state',
  templateUrl: './orders-state.component.html',
  styleUrls: ['./orders-state.component.scss'],
})
export class OrdersStateComponent implements OnInit {
  orders: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.ordersService.getOrders().subscribe((data) => {
        this.orders = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
