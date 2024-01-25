import { FormControl } from '@angular/forms';
import { Role } from 'src/app/shared/enums/role.enum';

export interface RegisterForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  login: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
  phoneNumber: FormControl<string>;
  checkbox: FormControl<boolean>;
  role: FormControl<Role>;
}
