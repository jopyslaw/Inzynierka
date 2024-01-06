import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { UUID } from 'angular2-uuid';
import { TokenService } from 'src/app/services/token/token.service';
import {
  AdvertisementEventsModel,
  AdvertisementModel,
} from 'src/app/shared/models/advertisement.model';
import { AddOfferModel } from './addOfferForm.model';
import { CategoryAdvertisementEnum } from 'src/app/shared/enums/categoryAdvertisement.enum';
import { AdvertisementService } from 'src/app/services/advertisement-service/advertisement.service';
import { AdvertisementEventsService } from 'src/app/services/advertisement-events/advertisement-events.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  private destroy$: Subject<void> = new Subject<void>();
  addForm!: FormGroup<AddOfferModel>;
  advertisementId: string | null = null; // służy do sprawdzenia czy jest to edycja

  advertisement: AdvertisementModel | null = null; // ogłoszenie pobrane przy edycji
  advertisementEvents: AdvertisementEventsModel[] = []; // wszystkie eventy użytkownika
  currentDate!: string; // aktualna data
  deletedEventsIds: string[] = [];

  advertisementCategories: {
    name: string;
    value: CategoryAdvertisementEnum;
  }[] = [
    { name: 'Artystyczne', value: CategoryAdvertisementEnum.ARTISTIC },
    { name: 'Humanistyczne', value: CategoryAdvertisementEnum.HUMAN },
    { name: 'Ścisłe', value: CategoryAdvertisementEnum.SCIENCE },
    { name: 'Inne', value: CategoryAdvertisementEnum.OTHERS },
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    selectable: true,
    events: this.advertisementEvents,
    editable: false,
    selectOverlap: false,
    eventOverlap: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    validRange: {
      start: '',
    },
  };

  constructor(
    private service: AdvertisementService,
    private fb: FormBuilder,
    private token: TokenService,
    private advertisementEventService: AdvertisementEventsService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.advertisementId = this.route.snapshot.params['id'];

    this.addForm = this.fb.group<AddOfferModel>({
      title: this.fb.control(null, Validators.required),
      category: this.fb.control(null, Validators.required),
      description: this.fb.control(null),
      price: this.fb.control(null, Validators.required),
      startDate: this.fb.control(null, Validators.required),
      endDate: this.fb.control(null, Validators.required),
    });

    this.getCurrentDate();

    if (this.advertisementId) {
      this.service
        .getAdvertisementById(this.advertisementId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.addForm.controls.startDate.disable();
          this.addForm.controls.title.disable();
          this.addForm.controls.price.disable();
          this.advertisement = response;
          this.addForm.patchValue(response);
          if (this.advertisementId) {
            this.advertisementEventService
              .getAllEventsForAdvertisement(this.advertisementId)
              .subscribe((response) => {
                const events = response.map((event) => ({
                  ...event,
                  backgroundColor: event.reserved === true ? 'gray' : '',
                }));
                this.advertisementEvents = events.flatMap((event) => event);
                this.calendarComponent.events = this.advertisementEvents;
                this.calendarComponent.options = {
                  ...this.calendarComponent.options,
                  validRange: {
                    start: this.currentDate,
                    end: moment(this.addForm.controls.endDate.value).format(
                      'YYYY-MM-DD'
                    ),
                  },
                };
              });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendForm(): void {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    if (this.advertisementId) {
      this.sendEditForm();
      return;
    }

    this.sendAddForm();
  }

  clearFrom(): void {
    this.addForm.reset();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    calendarApi.addEvent({
      id: UUID.UUID(),
      title: this.addForm.controls.title.value ?? 'Korki',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      reserved: false,
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.confirmDialog(clickInfo);
  }

  getAllAdvertisementEventsForUser(): void {
    const userId = this.token.getUserId();
    if (!userId) {
      return;
    }

    this.advertisementEventService
      .getAllEventsForUser(userId)
      .subscribe((response) => {
        const events = response.map((event) => {
          return { ...event, backgroundColor: 'gray' };
        });
        this.advertisementEvents = events.flatMap((event) => event);
        this.calendarComponent.events = this.advertisementEvents;
        this.calendarComponent.options = {
          ...this.calendarComponent.options,
          validRange: {
            start: moment(this.addForm.controls.startDate.value).format(
              'YYYY-MM-DD'
            ),
            end: moment(this.addForm.controls.endDate.value).format(
              'YYYY-MM-DD'
            ),
          },
        };
      });
  }

  isEditable(id: string): boolean {
    const eventIndex = this.advertisementEvents.findIndex(
      (advertisement) => advertisement.id === id
    );
    return eventIndex === -1 ? false : true;
  }

  getCurrentDate(): void {
    this.utilsService.getCurrentDate().subscribe((repsonse) => {
      this.currentDate = repsonse.stringDate;
    });
  }

  dateRangeChange(): void {
    this.getAllAdvertisementEventsForUser();
  }

  private sendAddForm(): void {
    const calendarApi = this.calendarComponent.getApi();
    const data = this.addForm.getRawValue();
    const allEventsInCalendar = calendarApi.getEvents().filter((event) => {
      const index = this.advertisementEvents.findIndex(
        (e) => e.id === event.toJSON()['id']
      );
      if (index === -1) {
        return true;
      }
      return false;
    });
    data.events = allEventsInCalendar;
    data.userId = this.token.getUserId() as string;

    this.service.addAdvertisement(data).subscribe((data) => {
      this.clearFrom();
    });
  }

  private sendEditForm(): void {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const calendarApi = this.calendarComponent.getApi();
    const data = this.addForm.getRawValue();
    const preparedData: any = {
      ...data,
    };
    const allEventsInCalendar = calendarApi.getEvents().filter((event) => {
      const index = this.advertisementEvents.findIndex(
        (e) => e.id === event.toJSON()['id']
      );
      if (index === -1) {
        return true;
      }
      return false;
    });

    preparedData.events = allEventsInCalendar;
    preparedData.userId = this.token.getUserId() as string;
    preparedData.deletedEventsIds = this.deletedEventsIds;
    preparedData.id = this.advertisementId;

    this.service.editAdvertisement(preparedData).subscribe((data) => {
      //this.clearFrom();
    });
  }

  deleteAdvertisement(): void {
    if (this.advertisementId) {
      this.service
        .deleteAdvertisement(this.advertisementId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.router.navigateByUrl('/tutorAdvertisement');
        });
    }
  }

  confirmDialog(additionalData: any): void {
    const eventData = additionalData.event.toJSON();
    if (eventData.extendedProps.reserved) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '200px',
      data: {
        title: 'Usuń dodany termin',
        message: 'Czy chcesz usunąć dodany termin',
        additionalData,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.removeEvent(dialogResult);
      }
    });
  }

  removeEvent(clickInfo: any): void {
    clickInfo.event.remove();
    if (this.advertisementId) {
      this.deletedEventsIds.push(clickInfo.event.extendedProps['_id']);
    }
  }
}
