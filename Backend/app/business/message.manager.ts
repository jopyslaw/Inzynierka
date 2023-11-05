import { Context } from "vm";
import { MessageDAO } from "../shared/models/messageDAO.model";
import messageDAO from "../DAO/messageDAO";
import userDAO from "../DAO/userDAO";

const operations = (context: Context) => {
  const createNewOrUpdate = async (notification: MessageDAO) => {
    const reserved = await messageDAO.createNewOrUpdate(notification);
    if (reserved) {
      return reserved;
    }
  };

  const removeById = async (posterId: string) => {
    const poster = await messageDAO.removeById(posterId);
    if (poster) {
      return poster;
    }
  };

  const listenToChangesInDatabase = async () => {
    return messageDAO.model.collection.watch();
  };

  const getNotReadedMessage = async (userId: string) => {
    const result = await messageDAO.getAllMessagesNotReadedForUserId(userId);
    if (result) {
      return JSON.stringify({ counter: result.length });
    }
  };

  const getAllUserContacts = async (userId: string) => {
    const result = await messageDAO.getAllUserContacts(userId);

    if (result.length) {
      const usersData = await userDAO.getUsersInformation(result);
      console.log(usersData);
      return usersData;
    }
  };
  /*
  const getNotifications = async (userId: string) => {
    const result = await messageDAO.getNotificationsForUserId(userId);
    if (result) {
      return result;
    }
  };

  const setNotificationToReadedState = async (notificationId: string) => {
    const result = await messageDAO.setNotificationToReadedState(
      notificationId
    );
    if (result) {
      return result;
    }
  };*/

  return {
    createNewOrUpdate,
    removeById,
    listenToChangesInDatabase,
    getNotReadedMessage,
    getAllUserContacts,
    /*
    getNotifications,
    setNotificationToReadedState,*/
  };
};

export default {
  operations,
};
