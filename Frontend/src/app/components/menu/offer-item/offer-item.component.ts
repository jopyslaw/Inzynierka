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

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit(): void {
    console.log(this.offerItemData);
  }

  addItemToBasket(): void {
    this.router.navigateByUrl('posterDetails/' + this.offerItemData._id);
  }
}
