import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Notification } from 'src/app/shared/models/notification.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {
  @Input() notification!: Notification;

  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {}

  checkIsReaded(): void {
    console.log(this.notification);
    this.notificationService
      .setNotificationToReadedState(this.notification._id ?? '')
      .subscribe((response) => {});
  }
}
