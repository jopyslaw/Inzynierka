import { TokenService } from '../../services/token/token.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
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
  numberOfMessages?: number;
  subscription: Subscription = new Subscription();
  role = '';

  constructor(
    private token: TokenService,
    private router: Router,
    private notificationService: NotificationsService,
    private socketService: SocketService,
    private socketServiceMessage: SocketService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.token.isLogged.subscribe((log: boolean) => {
        this.isLogged = log;
        if (this.token.getRole()) {
          this.role = this.token.getRole() ?? '';
          this.getNotifications();
          this.connectToSSE();
          this.getMessages();
          this.connectToSSEMessage();
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

  getMessages(): void {
    this.messageService
      .getMessageCounter(this.token.getUserId() ?? '')
      .subscribe((response) => {
        this.numberOfMessages = response.counter;
      });
  }

  connectToSSE(): void {
    this.socketService.connect(environment.SOCKET_NOTIFICATION_ENDPOINT);

    this.socketService.on('newNotificationCounter').subscribe((counter) => {
      const counterJSON = JSON.parse(counter);
      this.numberOfNotifications = counterJSON.counter;
    });
  }

  connectToSSEMessage(): void {
    this.socketServiceMessage.connect(environment.SOCKET_MESSAGE_ENDPOINT);

    this.socketServiceMessage.on('newMessageCounter').subscribe((counter) => {
      const counterJSON = JSON.parse(counter);
      this.numberOfMessages = counterJSON.counter;
    });
  }
}
