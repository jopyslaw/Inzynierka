import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  contacts!: any[];
  selectedContact: any;
  messages!: any[];

  constructor(
    private messageService: MessageService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getContacts();
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
  }
}
