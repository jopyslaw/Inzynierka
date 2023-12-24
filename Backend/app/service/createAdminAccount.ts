import businessContainer from "../business/business.container";
import { UserRole } from "../shared/enums/userRole.enum";

export const addAdminAccount = async () => {
  const shouldStart = await businessContainer
    .getUserManager()
    .getUsersByRole(UserRole.ADMIN);

  if (shouldStart.length > 0) {
    return;
  }

  const mockData = {
    email: "admin@com.pl",
    name: "admin",
    surname: "admin",
    login: "admin",
    role: UserRole.ADMIN,
    isAdmin: true,
    phoneNumber: "000000000",
    password: "admin",
  };

  const data = await businessContainer
    .getUserManager()
    .createNewOrUpdate(mockData);
};
