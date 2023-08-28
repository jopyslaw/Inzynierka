import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register/register.service';
import { emailRegex } from './../../../assets/validators/email-validator';
import { passwordRegex } from './../../../assets/validators/password-validator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(
    private service: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
