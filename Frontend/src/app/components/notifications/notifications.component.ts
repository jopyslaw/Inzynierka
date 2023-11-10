import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications!: Notification[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private notificationService: NotificationsService,
    private tokenService: TokenService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
    this.connectSSE();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getNotifications(): void {
    if (!this.tokenService.getUserId()) {
      return;
    }

    this.notificationService
      .getNotificationsForUser(this.tokenService.getUserId() ?? '')
      .pipe(takeUntil(this.destroy$))
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

    this.socketService
      .on('newNotifications')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log(response);
        this.notifications = response;
      });
  }
}
