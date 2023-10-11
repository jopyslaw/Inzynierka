import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PosterModel } from 'src/app/shared/models/poster.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offerItemData!: PosterModel;

  colors: string[] = [
    '#eae672',
    '#9FF5F5',
    '#FAD1FF',
    '#E3FFC9',
    '#FFDEE8',
    '#DEFFE1',
  ];

  class: string[] = ['transformNote1', 'transformNote2'];

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit(): void {
    console.log(this.offerItemData);
  }

  addItemToBasket(): void {
    this.router.navigateByUrl('posterDetails/' + this.offerItemData._id);
  }

  randomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    const randomColor = this.colors[randomIndex];
    return randomColor;
  }

  randomClass(): string {
    const randomIndex = Math.floor(Math.random() * this.class.length);
    const randomColor = this.class[randomIndex];
    return randomColor;
  }
}
