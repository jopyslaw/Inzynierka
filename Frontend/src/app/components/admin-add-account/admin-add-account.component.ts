import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register/register.service';
import { emailRegex } from 'src/assets/validators/email-validator';
import { passwordRegex } from 'src/assets/validators/password-validator';

@Component({
  selector: 'app-admin-add-account',
  templateUrl: './admin-add-account.component.html',
  styleUrls: ['./admin-add-account.component.scss'],
})
export class AdminAddAccountComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private register: RegisterService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      password: new FormControl('', [
        Validators.pattern(passwordRegex),
        Validators.required,
      ]),
      repeatPassword: new FormControl('', [
        Validators.pattern(passwordRegex),
        Validators.required,
      ]),
      phoneNumber: new FormControl(''),
      checkbox: new FormControl(false),
    });
  }

  clear(): void {
    this.registerForm.reset();
  }

  send(): void {
    const data = this.registerForm.value;
    delete data.repeatPassword;
    this.subscriptions.add(
      this.register.registerEmployee(data).subscribe((data) => {})
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
