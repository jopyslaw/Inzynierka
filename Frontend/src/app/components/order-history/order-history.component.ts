import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/services/token/token.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PosterEventsService } from 'src/app/services/poster-events/poster-events.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  private destroy$: Subject<void> = new Subject<void>();
  validRange = {
    start: '',
  };

  data!: any[];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    selectable: true,
    events: [],
    editable: false,
    eventClick: this.handleEventClick.bind(this),
    validRange: this.validRange,
  };

  constructor(
    private dialog: MatDialog,
    private tokenService: TokenService,
    private posterEventsService: PosterEventsService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getCurrentDate();
    this.getAllReservations();
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
    console.log(clickInfo.event.toJSON());
  }

  confirmDialog(additionalData: any): void {
    if (additionalData.extendedProps.reserved) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm',
        message: 'Czy chcesz usunąć wizytę',
        additionalData,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.removeVisit(dialogResult);
      }
    });
  }

  removeVisit(data: any): void {
    this.posterEventsService
      .removeEventFromUser(data.extendedProps.reservedId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.getAllReservations();
      });
  }

  getAllReservations(): void {
    const userId = this.tokenService.getUserId();

    if (userId) {
      this.posterEventsService
        .getAllReservedUserEvents(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.data = response;
          this.calendarComponent.events = this.data;
        });
    }
  }

  getCurrentDate(): void {
    this.utilsService
      .getCurrentDate()
      .pipe(takeUntil(this.destroy$))
      .subscribe((repsonse) => {
        this.validRange.start = repsonse.stringDate;
        this.calendarComponent.options = {
          ...this.calendarComponent.options,
          validRange: {
            start: repsonse.stringDate,
          },
        };
      });
  }
}
