import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FoodService } from 'src/app/services/food-service/food.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { UUID } from 'angular2-uuid';
//import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  addForm!: FormGroup;
  foodCategories: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    selectable: true,

    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this)
  };
  //currentEvents = signal<EventApi[]>([]);

  constructor(
    private addService: FoodService,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: this.fb.control(null),
      category: this.fb.control(null),
      description: this.fb.control(null),
      price: this.fb.control(null),
      /*events: this.fb.group({
        eventsData: this.fb.array([]),
      }),*/
    });
  }

  sendForm(): void {
    const calendarApi = this.calendarComponent.getApi();
    const data = this.addForm.getRawValue();
    const events = calendarApi.getEvents().map((event) => {
      return event.toJSON();
    });
    data.events = events;
    console.log(events);
    console.log(data);

    /*this.addService.addFood(data).subscribe((data) => {
      console.log('data was send');
    });*/
  }

  clearFrom(): void {
    this.addForm.reset();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: UUID.UUID(),
      title: 'Korki',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
    console.log(
      calendarApi.getEvents().forEach((d) => {
        console.log(d.toJSON());
      })
    );
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }
}
