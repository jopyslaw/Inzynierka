import { TokenService } from '../../services/token/token.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LoginService } from '../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { passwordRegex } from './../../../assets/validators/password-validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private login: LoginService,
    private store: LocalStorageService,
    private router: Router,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
    });
  }

  sendLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.login.sendData(this.loginForm.value).subscribe({
      next: (data) => {
        if (data) {
          this.token.setToken(data.token);
          this.token.isLogged.next(true);
        }
      },
      complete: () => this.router.navigate(['/']),
    });
    //change this.token to data where the token from backend should be
  }
}
