import { Context } from "vm";
import notificationsDAO from "../DAO/notificationsDAO";
import { NotificationDAO } from "../shared/models/notificationDAO.model";
import moment from "moment";

const operations = (context: Context) => {
  const createNewOrUpdate = async (notification: NotificationDAO) => {
    const data: NotificationDAO = {
      ...notification,
      dateTimeSend: moment().toISOString(),
    };

    const reserved = await notificationsDAO.createNewOrUpdate(data);
    if (reserved) {
      return reserved;
    }
  };

  const removeById = async (advertisementId: string) => {
    const advertisement = await notificationsDAO.removeById(advertisementId);
    if (advertisement) {
      return advertisement;
    }
  };

  const listenToChangesInDatabase = async () => {
    return notificationsDAO.model.collection.watch();
  };

  const getNotReadedNotifications = async (userId: string) => {
    const result = await notificationsDAO.getAllNotificationsNotReadedForUserId(
      userId
    );
    if (result) {
      return JSON.stringify({ counter: result.length });
    }
  };

  const getNotifications = async (userId: string) => {
    const result = await notificationsDAO.getNotificationsForUserId(userId);
    if (result) {
      return result;
    }
  };

  const getNotificationsNotReaded = async (userId: string) => {
    const result = await notificationsDAO.getAllNotificationsNotReadedForUserId(
      userId
    );
    if (result) {
      return result;
    }
  };

  const setNotificationToReadedState = async (notificationId: string) => {
    const result = await notificationsDAO.setNotificationToReadedState(
      notificationId
    );
    if (result) {
      return result;
    }
  };

  const createMany = async (notifications: any[]) => {
    const result = await notificationsDAO.createMany(notifications);

    return result;
  };

  return {
    createNewOrUpdate,
    removeById,
    listenToChangesInDatabase,
    getNotReadedNotifications,
    getNotifications,
    setNotificationToReadedState,
    getNotificationsNotReaded,
    createMany,
  };
};

export default {
  operations,
};
