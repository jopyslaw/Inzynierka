import { TokenService } from '../../services/token/token.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogged?: boolean;
  numberOfNotifications?: number;
  subscription: Subscription = new Subscription();
  role = '';

  constructor(
    private token: TokenService,
    private router: Router,
    private notificationService: NotificationsService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.token.isLogged.subscribe((log: boolean) => {
        this.isLogged = log;
        if (this.token.getRole()) {
          this.role = this.token.getRole() ?? '';
          this.getNotifications();
          this.connectToSSE();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut(): void {
    this.token.removeToken();
    this.router.navigate(['/']);
  }

  getNotifications(): void {
    this.notificationService
      .getNotificationCounter(this.token.getUserId() ?? '')
      .subscribe((result) => {
        this.numberOfNotifications = result.counter;
      });
  }

  connectToSSE(): void {
    this.socketService.connect(environment.SOCKET_NOTIFICATION_ENDPOINT);

    this.socketService.on('newNotificationCounter').subscribe((counter) => {
      const counterJSON = JSON.parse(counter);
      this.numberOfNotifications = counterJSON.counter;
    });
  }
}
