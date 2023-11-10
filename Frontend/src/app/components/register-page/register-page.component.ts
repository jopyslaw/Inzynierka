import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register/register.service';
import { passwordRegex } from './../../../assets/validators/password-validator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/shared/enums/role.enum';
import { RegisterForm } from './register-form.model';
import { RegisterModel } from 'src/app/shared/models/register.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup<RegisterForm>;
  subscriptions: Subscription = new Subscription();
  roles: Role[] = [Role.TUTOR, Role.USER];

  constructor(
    private service: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group<RegisterForm>({
      name: this.fb.nonNullable.control('', [Validators.required]),
      surname: this.fb.nonNullable.control('', [Validators.required]),
      login: this.fb.nonNullable.control('', [Validators.required]),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      repeatPassword: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      phoneNumber: this.fb.nonNullable.control('', [Validators.required]),
      checkbox: this.fb.nonNullable.control(false),
      role: this.fb.nonNullable.control(Role.USER, [Validators.required]),
    });
  }

  clear(): void {
    this.registerForm.reset();
  }

  send(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const data = this.registerForm.getRawValue();
    const dataToSend: RegisterModel = {
      name: data.name,
      surname: data.surname,
      login: data.login,
      password: data.password,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
    };
    this.subscriptions.add(
      this.service.register(dataToSend).subscribe(() => {
        this.router.navigate(['']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
