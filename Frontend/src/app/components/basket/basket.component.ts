import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { startWith, Subscription } from 'rxjs';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { BasketService } from './../../services/basket/basket.service';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('basketItems') viewChildren!: QueryList<BasketItemComponent>;
  basketItems: any[] = [];
  itemsToSend: any[] = [];
  subscriptions: Subscription = new Subscription();

  deliveryOptions: string[] = ['Odbiór osobsity', 'Dostawca'];

  paymentsMethods: string[] = ['Zapłata przy odbiorze'];

  selectedDelivery!: string;
  selectedPaymentMethod!: string;
  allCost: number = 0;

  constructor(
    private basket: BasketService,
    private changeDetector: ChangeDetectorRef,
    private orderService: OrdersService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.basketItems = this.basket.getItemsFromBasket();
    this.subscriptions.add(
      this.basket.basketUpdate.subscribe((value) => {
        if (value) {
          this.itemsToSend = [];
          this.viewChildren.forEach((item) => {
            this.itemsToSend.push(item.getItemInformation());
          });
          this.calculateCost();
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.viewChildren.changes.pipe(startWith(0)).subscribe((change) => {
        this.itemsToSend = [];
        this.viewChildren.forEach((item) => {
          this.itemsToSend.push(item.getItemInformation());
        });
        this.calculateCost();
        this.changeDetector.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeItemFromBasket(item: any): void {
    this.basket.removeItemFromBasket(item);
    this.basketItems = this.basketItems.filter(
      (oneItem) => oneItem.foodId !== item.foodId
    );
    this.basket.numberOfElements.next(0);
  }

  clearBasket(): void {
    this.basketItems = [];
    this.itemsToSend = [];
    this.basket.clearAllBasket();
  }

  calculateCost(): void {
    this.allCost = this.itemsToSend.reduce(
      (prev, next) => prev + next.amount * next.price,
      0
    );
  }

  send(): void {
    const userId = this.localStorageService.get('userId');
    const dataToSend = {
      totalCost: this.allCost,
      userId: userId,
      //products: this.basketItems,
    };

    this.subscriptions.add(
      this.orderService.sendOrder(dataToSend).subscribe(() => {
        this.clearBasket();
        this.router.navigate(['orderHistory']);
      })
    );
  }
}
