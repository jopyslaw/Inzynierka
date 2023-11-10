import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import {
  PosterEventsModel,
  PosterModel,
} from 'src/app/shared/models/poster.model';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PosterService } from 'src/app/services/poster-service/poster.service';
import { ActivatedRoute } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PosterEventsService } from 'src/app/services/poster-events/poster-events.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-poster-details',
  templateUrl: './poster-details.component.html',
  styleUrls: ['./poster-details.component.scss'],
})
export class PosterDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  posterData?: PosterModel;
  events?: PosterEventsModel[] = [];
  posterId!: string;
  private destroy$: Subject<void> = new Subject<void>();

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    selectable: true,
    editable: false,
    selectOverlap: false,
    eventOverlap: false,
    events: [],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private service: PosterService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private posterEventsService: PosterEventsService,
    private tokenService: TokenService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.posterId = this.route.snapshot.params['id'];
    this.getPosterData(this.posterId);
    this.getCurrentDate();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleEventClick(clickInfo: EventClickArg) {
    /*if (this.isEditable(clickInfo.event.id)) {
      return;
    }*/
    this.confirmDialog(clickInfo.event.toJSON());
  }

  getPosterData(id: string): void {
    this.service
      .getPosterById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.posterData = response;
      });

    this.posterEventsService
      .getAllEventsForPoster(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.events = response.map((event) => {
          return {
            ...event,
            backgroundColor: event.reserved ? 'gray' : '',
          };
        });
        this.calendarComponent.events = this.events;
      });
  }

  confirmDialog(additionalData: any): void {
    if (additionalData.extendedProps.reserved) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm',
        message: 'Czy chcesz zarezrwować wizytę',
        additionalData,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.reserveVisit(dialogResult);
        }
      });
  }

  reserveVisit(data: any): void {
    const preparedData = {
      tutorId: this.posterData?.userId,
      userId: this.tokenService.getUserId(),
      advertisementId: data.extendedProps.advertisementId,
      advertisementEventId: data.extendedProps._id,
    };
    this.posterEventsService
      .saveEventToUser(preparedData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.getPosterData(this.posterId);
      });
  }

  getCurrentDate(): void {
    this.utilsService
      .getCurrentDate()
      .pipe(takeUntil(this.destroy$))
      .subscribe((repsonse) => {
        this.calendarComponent.options = {
          ...this.calendarComponent.options,
          validRange: {
            start: repsonse.stringDate,
          },
        };
      });
  }
}
