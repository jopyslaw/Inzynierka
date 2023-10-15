import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PosterModel } from 'src/app/shared/models/poster.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offerItemData!: PosterModel;
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

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.randomClassValue = this.randomClass();
    this.randomColorValue = this.randomColor();
    console.log(this.offerItemData);
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
