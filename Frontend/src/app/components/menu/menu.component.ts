import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdvertisementModel } from 'src/app/shared/models/advertisement.model';
import { CategoryAdvertisementEnum } from 'src/app/shared/enums/categoryAdvertisement.enum';
import { AdvertisementService } from 'src/app/services/advertisement-service/advertisement.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  filterOption: CategoryAdvertisementEnum[] = [
    CategoryAdvertisementEnum.ARTISTIC,
    CategoryAdvertisementEnum.HUMAN,
    CategoryAdvertisementEnum.SCIENCE,
    CategoryAdvertisementEnum.OTHERS,
  ];
  private destroy$: Subject<void> = new Subject<void>();

  items: AdvertisementModel[] = [];

  constructor(private service: AdvertisementService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.service
      .getAllAvailableAdvertisements()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.items = response;
      });
  }
}
