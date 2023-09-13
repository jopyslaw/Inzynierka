import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import {
  PosterEventsModel,
  PosterModel,
} from 'src/app/shared/models/poster.model';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PosterService } from 'src/app/services/poster-service/poster.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-poster-details',
  templateUrl: './poster-details.component.html',
  styleUrls: ['./poster-details.component.scss'],
})
export class PosterDetailsComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  posterData!: PosterModel;
  events: PosterEventsModel[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    selectable: true,
    events: [],
    editable: false,
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private service: PosterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const posterId = this.route.snapshot.params['id'];
    this.getPosterData(posterId);
  }

  handleEventClick(clickInfo: EventClickArg) {
    /*if (this.isEditable(clickInfo.event.id)) {
      return;
    }*/
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  getPosterData(id: string): void {
    this.service.getPosterById(id).subscribe((response) => {
      console.log(response);
      this.posterData = response;
      this.events = response.events;
      //this.calendarComponent.events = this.events;
    });
  }
}
