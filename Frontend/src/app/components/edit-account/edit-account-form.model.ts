import { FormControl } from '@angular/forms';

export interface RegisterForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  login: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
}

export interface PasswordForm {
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}
