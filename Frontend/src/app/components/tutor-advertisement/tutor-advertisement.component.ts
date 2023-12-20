import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AdvertisementService } from 'src/app/services/advertisement-service/advertisement.service';
import { TokenService } from 'src/app/services/token/token.service';
import { AdvertisementModel } from 'src/app/shared/models/advertisement.model';

@Component({
  selector: 'app-tutor-advertisement',
  templateUrl: './tutor-advertisement.component.html',
  styleUrls: ['./tutor-advertisement.component.scss'],
})
export class TutorAdvertisementComponent {
  private destroy$: Subject<void> = new Subject<void>();

  items: AdvertisementModel[] = [];

  constructor(
    private service: AdvertisementService,
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
        .getAllAvailableAdvertisementsForTutor(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.items = response;
        });
    }
  }
}