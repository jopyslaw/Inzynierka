import { foodModel } from '../../shared/models/food.model';
import { Subscription } from 'rxjs';
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
  filterOption: any[] = [
    CategoryPosterEnum.ARTISTIC,
    CategoryPosterEnum.HUMAN,
    CategoryPosterEnum.SCIENCE,
    CategoryPosterEnum.OTHERS,
  ];

  private subsrciption: Subscription = new Subscription();

  items: PosterModel[] = [];

  constructor(private service: PosterService) {}
  ngOnDestroy(): void {
    this.subsrciption.unsubscribe();
  }

  ngOnInit(): void {
    this.service.getAllAvailablePosters().subscribe((response) => {
      this.items = response;
    });
  }
}
