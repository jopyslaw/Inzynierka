import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications!: Notification[];

  constructor(
    private notificationService: NotificationsService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    if (!this.tokenService.getUserId()) {
      return;
    }

    this.notificationService
      .getNotificationsForUser(this.tokenService.getUserId() ?? '')
      .subscribe((response) => {
        this.notifications = response;
      });
  }
}
