import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { PosterModel } from 'src/app/shared/models/poster.model';
import { AddOfferModel } from './addOfferForm.model';
import { CategoryPosterEnum } from 'src/app/shared/enums/categoryPoster.enum';
import { PosterService } from 'src/app/services/poster-service/poster.service';
import { PosterEventsService } from 'src/app/services/poster-events/poster-events.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  addForm!: FormGroup<AddOfferModel>;
  posterData!: PosterModel[];
  posterCategories: any[] = [
    CategoryPosterEnum.ARTISTIC,
    CategoryPosterEnum.HUMAN,
    CategoryPosterEnum.SCIENCE,
    CategoryPosterEnum.OTHERS,
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    selectable: true,
    events: this.posterData,
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
    private addService: PosterService,
    private fb: FormBuilder,
    private token: TokenService,
    private posterEventService: PosterEventsService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group<AddOfferModel>({
      title: this.fb.control(null, Validators.required),
      category: this.fb.control(null, Validators.required),
      description: this.fb.control(null),
      price: this.fb.control(null, Validators.required),
    });

    this.getAllPosterForUser();
    this.getCurrentDate();
  }

  sendForm(): void {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const calendarApi = this.calendarComponent.getApi();
    const data = this.addForm.getRawValue();
    const events = calendarApi.getEvents().filter((event) => {
      const index = this.posterData.findIndex(
        (e) => e.id === event.toJSON()['id']
      );
      if (index === -1) {
        return true;
      }
      return false;
    });
    data.events = events;
    data.userId = this.token.getUserId() as string;

    console.log(data);

    this.addService.addPoster(data).subscribe((data) => {
      console.log('data was send');
    });
  }

  clearFrom(): void {
    this.addForm.reset();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

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

  getAllPosterForUser(): void {
    if (!this.token.getUserId()) {
      return;
    }

    this.posterEventService
      .getAllEventsForUser(this.token.getUserId() as string)
      .subscribe((data) => {
        const posterData = data.map((event) => {
          return { ...event, backgroundColor: 'gray' };
        });
        this.posterData = posterData.flatMap((event) => event) as any;
        console.log(this.posterData);
        this.calendarComponent.events = this.posterData;
      });
  }

  isEditable(id: string): boolean {
    const eventIndex = this.posterData.findIndex((poster) => poster.id === id);
    return eventIndex === -1 ? false : true;
  }

  getCurrentDate(): void {
    this.utilsService.getCurrentDate().subscribe((repsonse) => {
      this.calendarComponent.options = {
        ...this.calendarComponent.options,
        validRange: {
          start: repsonse.stringDate,
        },
      };
    });
  }
}
