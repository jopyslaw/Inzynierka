import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Notification } from 'src/app/shared/models/notification.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications!: Notification[];

  constructor(
    private notificationService: NotificationsService,
    private tokenService: TokenService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
    this.connectSSE();
  }

  getNotifications(): void {
    if (!this.tokenService.getUserId()) {
      return;
    }

    this.notificationService
      .getNotificationsForUser(this.tokenService.getUserId() ?? '')
      .subscribe((response: any[]) => {
        this.notifications = response;
      });
  }

  connectSSE(): void {
    this.socketService.connect(environment.SOCKET_NOTIFICATION_ENDPOINT_DATA, {
      query: {
        userId: this.tokenService.getUserId(),
      },
    });

    this.socketService.on('newNotifications').subscribe((response) => {
      console.log(response);
      this.notifications = response;
    });
  }
}
