import { UserRole } from "../enums/userRole.enum";

export interface UserDAO {
  id?: string;
  email: string;
  name: string;
  surname: string;
  login: string;
  role: UserRole;
  active: boolean;
  isAdmin: boolean;
  password: string;
}
