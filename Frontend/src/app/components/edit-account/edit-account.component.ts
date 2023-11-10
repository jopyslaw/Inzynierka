import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EditAccountService } from 'src/app/services/editAccount/edit-account.service';
import { TokenService } from 'src/app/services/token/token.service';
import { emailRegex } from 'src/assets/validators/email-validator';
import { passwordRegex } from 'src/assets/validators/password-validator';
import { PasswordForm, RegisterForm } from './edit-account-form.model';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit, OnDestroy {
  oldAccountInfo: any;
  registerForm!: FormGroup<RegisterForm>;
  passwordForm!: FormGroup<PasswordForm>;

  destroy$: Subject<void> = new Subject();
  constructor(
    private service: EditAccountService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id: this.fb.control({
        value: this.tokenService.getUserId(),
        disabled: true,
      }),
      name: this.fb.control('', [Validators.required]),
      surname: this.fb.control('', [Validators.required]),
      login: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      phoneNumber: this.fb.control(''),
    });

    this.passwordForm = this.fb.group({
      password: this.fb.nonNullable.control('', [
        Validators.pattern(passwordRegex),
        Validators.required,
      ]),
      repeatPassword: this.fb.nonNullable.control('', [
        Validators.pattern(passwordRegex),
        Validators.required,
      ]),
    });

    this.getAccountData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clear(): void {
    this.registerForm.reset();
  }

  updateAccountData(): void {
    const data = this.registerForm.getRawValue();
    this.service
      .updateAccountInfo(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});
  }

  updatePassword(): void {
    const data = this.passwordForm.controls.password.value;
    const userId = this.tokenService.getUserId();
    if (userId) {
      this.service
        .updatePassword(userId, data)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {});
    }
  }

  private getAccountData(): void {
    const userId = this.tokenService.getUserId();
    if (userId) {
      this.service
        .getAccountInfo(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.oldAccountInfo = data;
          this.patchFormData(data);
        });
    }
  }

  private patchFormData(data: any): void {
    this.registerForm.patchValue(data);
  }
}
