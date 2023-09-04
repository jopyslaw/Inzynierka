import { Role } from '../enums/role.enum';

export interface DecodedToken {
  access: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
  name: string;
  role: Role;
  userId: string;
}
