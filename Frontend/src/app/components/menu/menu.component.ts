import { foodModel } from './../../models/food.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from 'src/app/services/food-service/food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  filterOption: any[] = [
    'Pizza',
    'Dania główne',
    'Przekąski',
    'Napoje',
    'Desery',
    'Przystawki',
  ];

  private subsrciption: Subscription = new Subscription();

  items: foodModel[] = [];
  photos: any[] = [];

  constructor(private service: FoodService) {}
  ngOnDestroy(): void {
    this.subsrciption.unsubscribe();
  }

  ngOnInit(): void {
    this.subsrciption.add(
      this.service.getFood().subscribe((data) => {
        this.items = data;
      })
    );
  }
}
