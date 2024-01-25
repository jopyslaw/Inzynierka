import { TokenService } from '../../services/token/token.service';
import { LoginService } from '../../services/login/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from './login-form.model';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup<LoginForm>;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private login: LoginService,
    private router: Router,
    private token: TokenService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group<LoginForm>({
      login: this.fb.nonNullable.control('', [Validators.required]),
      password: this.fb.nonNullable.control('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const data = this.loginForm.getRawValue();

    this.login
      .login(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data) {
            this.token.setToken(data.token);
            this.token.isLogged.next(true);
          }
        },
        complete: () => this.router.navigate(['/']),
      });
  }
}
