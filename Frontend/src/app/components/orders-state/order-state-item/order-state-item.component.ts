import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-state-item',
  templateUrl: './order-state-item.component.html',
  styleUrls: ['./order-state-item.component.scss'],
})
export class OrderStateItemComponent implements OnInit {
  @Input() item: any;
  @Input() index: any;

  constructor(private order: OrdersService) {}

  ngOnInit(): void {}

  changeOrderState(status: string): void {
    console.log(this.item);
    const data = this.item.deliveryId;
    this.order.changeOrderStatus(data).subscribe((data) => console.log(data));
  }
}
