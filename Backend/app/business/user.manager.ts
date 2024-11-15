import { Context } from "vm";
import tokenDAO from "../DAO/tokenDAO";
import passwordDAO from "../DAO/passwordDAO";
import UserDAO from "../DAO/userDAO";
import bcrypt from "bcrypt";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import { UserDAO as UserDaoModel } from "../shared/models/userDAO.model";
import { TokenDAO } from "../shared/models/tokenDAO.model";
import userDAO from "../DAO/userDAO";
import reservedEventDAO from "../DAO/reservedEventDAO";
import advertisementEventDAO from "../DAO/advertisementEventDAO";
import advertisementDAO from "../DAO/advertisementDAO";
import { NotificationDAO } from "../shared/models/notificationDAO.model";
import moment from "moment";
import { NotificationTypeEnum } from "../shared/enums/notificationType.enum";
import businessContainer from "./business.container";
import { UserRole } from "../shared/enums/userRole.enum";

const saltRounds = 10;

const operations = (context: Context) => {
  async function hashString(password: string) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  const authenticate = async (name: string, password: string) => {
    let userData;
    const user = await UserDAO.getByEmailOrLogin(name);
    if (!user) {
      throw errorUtils.new(
        ErrorCodes.UNAUTHORIZED.code,
        "User with that email does not exist"
      );
    }
    userData = await user;
    await passwordDAO.authorize(user.id, password);
    const token = await tokenDAO.create(userData);
    return getToken(token);
  };

  const getToken = (token: TokenDAO) => {
    return { token: token.value };
  };

  const createNewOrUpdate = async (userData: UserDaoModel) => {
    const user = await UserDAO.createNewOrUpdate(userData);

    if (userData.id) {
      const notificationData: NotificationDAO = {
        userId: userData.id,
        advertisementId: null,
        title: "Dane zostały zmienione",
        content: "Dane zostały zmienione",
        isReaded: false,
        dateTimeSend: moment().toISOString(),
        typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
      };

      await businessContainer
        .getNotificationManager()
        .createNewOrUpdate(notificationData);
    }

    if (await userData.password) {
      return await passwordDAO.createOrUpdate({
        userId: user.id,
        password: await hashString(userData.password),
      });
    } else {
      return user;
    }
  };

  const removeHashSession = async (userId: string) => {
    return await tokenDAO.remove(userId);
  };

  const getAccountInfo = async (userId: string) => {
    const user = await UserDAO.get(userId);
    if (user) {
      return user;
    }
  };

  const updatePassword = async (userId: string, password: string) => {
    const hashedPassword = await hashString(password);
    const result = await passwordDAO.createOrUpdate({
      userId,
      password: hashedPassword,
    });
    if (result) {
      return result;
    }
  };

  const getAllTutors = async () => {
    const result = await userDAO.getAllTutors();
    if (result) {
      return result;
    }
  };

  const getUsersForTutors = async (userId: string) => {
    const adevertismements =
      await advertisementDAO.getAllActiveAndNotArchivedAdvertismentsForTutor(
        userId
      );

    const advertisementsIds = adevertismements.map((advertisement) =>
      advertisement._id.toString()
    );

    const advertisementEvents =
      await advertisementEventDAO.getAllAdvertisementEventsForAdvertismentIds(
        advertisementsIds
      );

    const advertisementsEventsIds = advertisementEvents.map((event) =>
      event._id.toString()
    );

    const reservedEvents =
      await reservedEventDAO.getAllReservationForAdvertisementId(
        advertisementsEventsIds
      );

    if (reservedEvents) {
      const usersIds = reservedEvents.map((event) => event.userId);

      const result = await userDAO.getUsersInformation(usersIds);

      return result;
    }
  };

  const getTutorsForUsers = async (userId: string) => {
    const events = await reservedEventDAO.getAllReservationsForUserId(userId);

    const eventsIds = events?.map((event) =>
      event.advertisementEventId.toString()
    );

    if (eventsIds) {
      const result = await advertisementEventDAO.getAllAdvertismentsForArray(
        eventsIds
      );

      const advertismentsIds = result.map((advertisement) =>
        advertisement.advertisementId.toString()
      );

      const advertisement =
        await advertisementDAO.getAllAdvertistmentsFromArray(advertismentsIds);

      const tutorIds = advertisement.map(
        (advertisement) => advertisement.userId
      );

      const tutors = await userDAO.getUsersInformation(tutorIds);

      return tutors;
    }
  };

  const getUsersByRole = async (role: UserRole) => {
    const result = await userDAO.getUsersByRole(role);

    return result;
  };

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession,
    getAccountInfo,
    updatePassword,
    getAllTutors,
    getTutorsForUsers,
    getUsersForTutors,
    getUsersByRole,
  };
};

export default {
  operations,
};
