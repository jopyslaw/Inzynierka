import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageModel } from './new-message-form.model';
import { MessageService } from 'src/app/services/message/message.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent implements OnInit {
  messageForm!: FormGroup<MessageModel>;
  tutors!: any[];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.fb.group<MessageModel>({
      title: this.fb.control(null, Validators.required),
      reciverId: this.fb.control(null, Validators.required),
      content: this.fb.control(null, Validators.required),
    });

    this.getAllTutors();
  }

  sendMessage(): void {
    const formData = this.messageForm.getRawValue();
    const dataToSend = {
      ...formData,
      senderId: this.tokenService.getUserId(),
    };

    this.messageService.sendMessage(dataToSend).subscribe((response) => {});
  }

  getAllTutors(): void {
    this.messageService.getAllTutors().subscribe((response) => {
      this.tutors = response;
    });
  }
}
