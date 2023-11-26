import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import {
  AdvertisementEventsModel,
  AdvertisementModel,
} from 'src/app/shared/models/advertisement.model';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AdvertisementService } from 'src/app/services/advertisement-service/advertisement.service';
import { ActivatedRoute } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AdvertisementEventsService } from 'src/app/services/advertisement-events/advertisement-events.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Subject, takeUntil } from 'rxjs';
import { ReservationModel } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.scss'],
})
export class AdvertisementDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  advertisementData?: AdvertisementModel;
  events?: AdvertisementEventsModel[] = [];
  advertisementId!: string;
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
    private service: AdvertisementService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private advertisementEventsService: AdvertisementEventsService,
    private tokenService: TokenService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.advertisementId = this.route.snapshot.params['id'];
    this.getAdvertisementData(this.advertisementId);
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

  getAdvertisementData(id: string): void {
    this.service
      .getAdvertisementById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.advertisementData = response;
      });

    this.advertisementEventsService
      .getAllEventsForAdvertisement(id)
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
      width: '500px',
      height: '200px',
      data: {
        title: 'Wydarzenie',
        message: 'Czy chcesz chcesz zarezerwować wydarzenie',
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
    const preparedData: ReservationModel = {
      tutorId: this.advertisementData?.userId ?? null,
      userId: this.tokenService.getUserId() ?? null,
      advertisementId: data.extendedProps.advertisementId,
      advertisementEventId: data.extendedProps._id,
    };
    this.advertisementEventsService
      .saveEventToUser(preparedData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.getAdvertisementData(this.advertisementId);
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
