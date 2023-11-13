import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PosterService } from 'src/app/services/poster-service/poster.service';
import { TokenService } from 'src/app/services/token/token.service';
import { CategoryPosterEnum } from 'src/app/shared/enums/categoryPoster.enum';
import { PosterModel } from 'src/app/shared/models/poster.model';

@Component({
  selector: 'app-tutor-advertisement',
  templateUrl: './tutor-advertisement.component.html',
  styleUrls: ['./tutor-advertisement.component.scss'],
})
export class TutorAdvertisementComponent {
  private destroy$: Subject<void> = new Subject<void>();

  items: PosterModel[] = [];

  constructor(
    private service: PosterService,
    private tokenService: TokenService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    const userId = this.tokenService.getUserId();

    if (userId) {
      this.service
        .getAllAvailablePostersForTutor(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.items = response;
        });
    }
  }
}
