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
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  private destroy$: Subject<void> = new Subject<void>();
  addForm!: FormGroup<AddOfferModel>;
  advertisementId: string | null = null;

  advertisement: AdvertisementModel | null = null;
  advertisementEvents: AdvertisementEventsModel[] = [];
  currentDate!: string;

  //advertisementData!: AdvertisementModel;

  advertisementCategories: CategoryAdvertisementEnum[] = [
    CategoryAdvertisementEnum.ARTISTIC,
    CategoryAdvertisementEnum.HUMAN,
    CategoryAdvertisementEnum.SCIENCE,
    CategoryAdvertisementEnum.OTHERS,
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
    private route: ActivatedRoute
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
          this.advertisement = response;
          this.addForm.patchValue(response);
          this.advertisementEventService
            .getAllEventsForAdvertisement(this.advertisement.id)
            .subscribe((response) => {
              this.advertisementEvents = response;
              this.calendarComponent.events = response;
            });
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

    const calendarApi = this.calendarComponent.getApi();
    const data = this.addForm.getRawValue();
    const events = calendarApi.getEvents().filter((event) => {
      const index = this.advertisement?.events.findIndex(
        (e) => e.id === event.toJSON()['id']
      );
      if (index === -1) {
        return true;
      }
      return false;
    });
    data.events = events;
    data.userId = this.token.getUserId() as string;

    if (this.advertisementId) {
      //data.id =
    }

    this.service.addAdvertisement(data).subscribe((data) => {
      this.clearFrom();
    });
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
    if (this.isEditable(clickInfo.event.id)) {
      return;
    }
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  getAllAdvertisementForUser(): void {
    if (!this.token.getUserId()) {
      return;
    }

    this.advertisementEventService
      .getAllEventsForUser(this.token.getUserId() as string)
      .subscribe((data) => {
        const advertisementData = data.map((event) => {
          return { ...event, backgroundColor: 'gray' };
        });
        this.advertisementEvents = advertisementData.flatMap(
          (event) => event
        ) as any;
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
    this.getAllAdvertisementForUser();
  }
}
