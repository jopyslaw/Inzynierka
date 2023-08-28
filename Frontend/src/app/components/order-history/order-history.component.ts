import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private ordersService: OrdersService,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const userId = this.storage.get('userId');
    const userIdNumber = Number(userId);
    this.subscription.add(
      this.ordersService.getUserOrders(userIdNumber).subscribe((data) => {
        this.orders = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
