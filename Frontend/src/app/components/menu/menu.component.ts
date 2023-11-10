import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PosterModel } from 'src/app/shared/models/poster.model';
import { CategoryPosterEnum } from 'src/app/shared/enums/categoryPoster.enum';
import { PosterService } from 'src/app/services/poster-service/poster.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  filterOption: CategoryPosterEnum[] = [
    CategoryPosterEnum.ARTISTIC,
    CategoryPosterEnum.HUMAN,
    CategoryPosterEnum.SCIENCE,
    CategoryPosterEnum.OTHERS,
  ];
  private destroy$: Subject<void> = new Subject<void>();

  items: PosterModel[] = [];

  constructor(private service: PosterService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.service
      .getAllAvailablePosters()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.items = response;
      });
  }
}
