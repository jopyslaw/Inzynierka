import { Role } from '../enums/role.enum';

export interface RegisterModel {
  name: string;
  surname: string;
  login: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: Role;
}
