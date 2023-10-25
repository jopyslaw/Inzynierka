import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register/register.service';
import { emailRegex } from './../../../assets/validators/email-validator';
import { passwordRegex } from './../../../assets/validators/password-validator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subscriptions: Subscription = new Subscription();
  roles: string[] = ['USER', 'TUTOR'];

  constructor(
    private service: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      surname: this.fb.control('', [Validators.required]),
      login: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      repeatPassword: this.fb.control('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      phoneNumber: this.fb.control('', [Validators.required]),
      checkbox: this.fb.control(false),
      role: this.fb.control('', [Validators.required]),
    });
  }

  clear(): void {
    this.registerForm.reset();
  }

  send(): void {
    console.log('work');
    const data = this.registerForm.value;
    delete data.checkbox;
    delete data.repeatPassword;
    this.subscriptions.add(
      this.service.register(data).subscribe(() => {
        this.router.navigate(['']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
