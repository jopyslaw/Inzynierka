import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailRegex } from 'src/assets/validators/email-validator';
import { passwordRegex } from 'src/assets/validators/password-validator';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit {
  registerForm!: FormGroup;

  constructor() {}

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

  send(): void {}
}
