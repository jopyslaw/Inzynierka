import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-history-item',
  templateUrl: './order-history-item.component.html',
  styleUrls: ['./order-history-item.component.scss'],
})
export class OrderHistoryItemComponent implements OnInit {
  @Input() item: any;

  private subscription: Subscription = new Subscription();
  constructor(
    private service: OrdersService,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {}
}
