import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register/register.service';
import { MockProvider } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterPageComponent],
      providers: [MockProvider(RegisterService), MockProvider(ActivatedRoute)],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form with validators', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls.name).toBeDefined();
    expect(component.registerForm.controls.surname).toBeDefined();
    expect(component.registerForm.controls.login).toBeDefined();
    expect(component.registerForm.controls.email).toBeDefined();
    expect(component.registerForm.controls.password).toBeDefined();
    expect(component.registerForm.controls.repeatPassword).toBeDefined();
    expect(component.registerForm.controls.phoneNumber).toBeDefined();
    expect(component.registerForm.controls.checkbox).toBeDefined();
    expect(component.registerForm.controls.role).toBeDefined();

    expect(
      component.registerForm.controls.login.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.registerForm.controls.password.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.registerForm.controls.name.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.registerForm.controls.surname.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.registerForm.controls.email.hasValidator(Validators.required)
    ).toBeTrue();
  });

  it('should clear form', () => {
    const mockData = {
      login: 'test',
      password: 'test',
    };

    const form = component.registerForm;

    form.patchValue(mockData);

    component.clear();

    expect(component.registerForm.controls.login.value).toBe('');
    expect(component.registerForm.controls.password.value).toBe('');
  });
});
