import { FoodService } from 'src/app/services/food-service/food.service';
import { BasketService } from './../../../services/basket/basket.service';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offerItemData: any;
  img: any;
  constructor(
    private basket: BasketService,
    private foodService: FoodService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.log(this.offerItemData);
    this.foodService.getFoodImg(this.offerItemData.foodId).subscribe((data) => {
      const objectURL = 'data:image/png;base64,' + data;
      this.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  addItemToBasket(): void {
    this.basket.addItemToBasket(this.offerItemData);
  }
}
