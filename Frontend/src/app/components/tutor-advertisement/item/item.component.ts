import { Component, Input, OnInit } from '@angular/core';
import { AdvertisementModel } from 'src/app/shared/models/advertisement.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() offerItemData!: AdvertisementModel;
  randomColorValue: string = '';
  randomClassValue: string = '';

  colors: string[] = [
    '#eae672',
    '#9FF5F5',
    '#FAD1FF',
    '#E3FFC9',
    '#FFDEE8',
    '#DEFFE1',
  ];

  class: string[] = ['transformNote1', 'transformNote2'];

  constructor() {}

  ngOnInit(): void {
    this.randomClassValue = this.randomClass();
    this.randomColorValue = this.randomColor();
  }

  randomColor(): string {
    return this.randomElementFromArray(this.colors);
  }

  randomClass(): string {
    return this.randomElementFromArray(this.class);
  }

  private randomElementFromArray(array: string[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomValue = array[randomIndex];
    return randomValue;
  }
}
