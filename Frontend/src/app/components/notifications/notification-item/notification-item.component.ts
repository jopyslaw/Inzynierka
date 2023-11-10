import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Notification } from 'src/app/shared/models/notification.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit, OnDestroy {
  @Input() notification!: Notification;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkIsReaded(): void {
    this.notificationService
      .setNotificationToReadedState(this.notification._id ?? '')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {});
  }
}
