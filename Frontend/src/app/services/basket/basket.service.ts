import { BehaviorSubject, Subject } from 'rxjs';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  numberOfElements: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.getNumberOfItems()
  );
  basketUpdate: Subject<boolean> = new Subject();

  constructor(private storage: LocalStorageService) {}

  addItemToBasket(item: any): void {
    const basket: any[] = JSON.parse(this.storage.get('basket') || '[]');
    basket.push(item);
    this.storage.set('basket', JSON.stringify(basket));
    this.numberOfElements.next(basket.length);
  }

  removeItemFromBasket(item: any): void {
    const basket: any[] = JSON.parse(this.storage.get('basket') || '[]');
    const newBasket = basket.filter(
      (oneItem) => oneItem.foodId !== item.foodId
    );
    this.storage.set('basket', JSON.stringify(newBasket));
    this.numberOfElements.next(newBasket.length);
  }

  getItemsFromBasket(): any[] {
    return JSON.parse(this.storage.get('basket') || '[]');
  }

  clearAllBasket(): void {
    this.storage.remove('basket');
  }

  getNumberOfItems(): number {
    const data = this.getItemsFromBasket();
    if (data) {
      return data.length;
    }
    return 0;
  }
}
