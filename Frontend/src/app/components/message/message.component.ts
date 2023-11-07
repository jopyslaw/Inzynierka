import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';
import { TokenService } from 'src/app/services/token/token.service';
import { NextMessageModel } from './message-form.model';
import { SocketService } from 'src/app/services/socket/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  form!: FormGroup<NextMessageModel>;
  contacts!: any[];
  selectedContact: any;
  messages!: any[];

  constructor(
    private messageService: MessageService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private socketService: SocketService
  ) {}

  get userId(): string {
    return this.tokenService.getUserId() ?? '';
  }

  ngOnInit(): void {
    this.getContacts();
    this.form = this.fb.group<NextMessageModel>({
      content: this.fb.control(null, Validators.required),
      senderId: this.fb.control({
        value: this.tokenService.getUserId(),
        disabled: true,
      }),
      reciverId: this.fb.control({
        value: null,
        disabled: true,
      }),
    });
    console.log(this.userId);
  }

  getContacts(): void {
    this.messageService
      .getAllContacts(this.tokenService.getUserId() ?? '')
      .subscribe((response) => {
        this.contacts = response;
      });
  }

  sendNewMessage(): void {
    this.router.navigateByUrl('newMessage');
  }

  getMessages(): void {
    const data = {
      senderId: this.tokenService.getUserId(),
      reciverId: this.selectedContact._id,
    };

    this.messageService.getMessages(data).subscribe((response: any) => {
      this.messages = response;
    });
  }

  selectedItem(data: any): void {
    this.selectedContact = data;
    console.log(data);
    this.getMessages();
    this.form.controls.reciverId.setValue(this.selectedContact._id);
    this.connectSSE();
    this.setStateToReaded();
  }

  sendMessage(): void {
    this.messageService
      .sendMessage(this.form.getRawValue())
      .subscribe((response) => {});
  }

  connectSSE(): void {
    this.socketService.connect(environment.SOCKET_MESSAGE_ENDPOINT_DATA, {
      query: {
        senderId: this.tokenService.getUserId(),
        reciverId: this.selectedContact._id,
      },
      forceNew: true,
    });

    this.socketService.on('newMessage').subscribe((response) => {
      console.log(response);
      this.messages = response;
    });
  }

  setStateToReaded(): void {
    const data: { senderId: string; reciverId: string } = {
      senderId: this.tokenService.getUserId() ?? '',
      reciverId: this.selectedContact._id,
    };
    this.messageService.setStateToReaded(data).subscribe((response) => {});
  }
}
