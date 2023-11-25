import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageModel } from './new-message-form.model';
import { MessageService } from 'src/app/services/message/message.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Subject, takeUntil } from 'rxjs';
import { Role } from 'src/app/shared/enums/role.enum';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent implements OnInit, OnDestroy {
  messageForm!: FormGroup<MessageModel>;
  tutors!: any[];
  private destroy$: Subject<void> = new Subject<void>();

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

    if (this.tokenService.getRole() === Role.TUTOR) {
      this.getUsersForTutors();
    } else {
      this.getTutorsForUsers();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendMessage(): void {
    const formData = this.messageForm.getRawValue();
    const dataToSend = {
      ...formData,
      senderId: this.tokenService.getUserId(),
    };

    this.messageService
      .sendMessage(dataToSend)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {});
  }

  getTutorsForUsers(): void {
    this.messageService
      .getTutorsForUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.tutors = response;
      });
  }

  getUsersForTutors(): void {
    this.messageService
      .getUsersForTutors()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.tutors = response;
      });
  }
}
