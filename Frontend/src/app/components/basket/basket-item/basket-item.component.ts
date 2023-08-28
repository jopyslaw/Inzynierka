import { BasketService } from './../../../services/basket/basket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent implements OnInit {
  @Input() item: any;
  @Output() itemRemoveEmitter: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private basket: BasketService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      itemAmount: new FormControl(1, [Validators.min(1)]),
    });

    this.subscriptions.add(
      this.form.get('itemAmount')?.valueChanges.subscribe(() => {
        this.basket.basketUpdate.next(true);
      })
    );
  }

  removeItem(item: any) {
    this.itemRemoveEmitter.emit(item);
  }

  getItemInformation(): any {
    return {
      ...this.item,
      amount: this.form.get('itemAmount')?.value,
    };
  }
}
