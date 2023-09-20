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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-poster-details',
  templateUrl: './poster-details.component.html',
  styleUrls: ['./poster-details.component.scss'],
})
export class PosterDetailsComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  posterData?: PosterModel;
  events?: PosterEventsModel[] = [];

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
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const posterId = this.route.snapshot.params['id'];
    this.getPosterData(posterId);
    console.log(this.events);
    console.log(this.posterData);
  }

  handleEventClick(clickInfo: EventClickArg) {
    /*if (this.isEditable(clickInfo.event.id)) {
      return;
    }*/
    this.confirmDialog(clickInfo.event.toJSON());
    console.log(clickInfo.event.toJSON());
  }

  getPosterData(id: string): void {
    this.service.getPosterById(id).subscribe((response) => {
      console.log(response);
      this.posterData = response;
      this.events = response.events;
      this.calendarComponent.events = this.events;
    });
  }

  confirmDialog(additionalData: any): void {
    const message = `Are you sure you want to do this?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm',
        message: 'Czy chcesz zarezrwować wizytę',
        additionalData,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.reserveVisit(dialogResult);
      }
    });
  }

  reserveVisit(data: any): void {
    console.log(data);
  }
}
