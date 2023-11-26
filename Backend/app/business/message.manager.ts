import { Context } from "vm";
import { MessageDAO } from "../shared/models/messageDAO.model";
import messageDAO from "../DAO/messageDAO";
import userDAO from "../DAO/userDAO";
import moment from "moment";

const operations = (context: Context) => {
  const createNewOrUpdate = async (message: MessageDAO) => {
    const data: MessageDAO = {
      ...message,
      dateTimeSend: moment().toISOString(),
    };

    const messageData = await messageDAO.createNewOrUpdate(data);
    if (messageData) {
      return messageData;
    }
  };

  const removeById = async (messageId: string) => {
    const message = await messageDAO.removeById(messageId);
    if (message) {
      return message;
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
      return usersData;
    }
  };

  const getAllMessages = async (senderId: string, reciverId: string) => {
    const result = await messageDAO.getAllMessages(senderId, reciverId);

    if (result) {
      return result;
    }
  };

  const setStateToReaded = async (data: {
    senderId: string;
    reciverId: string;
  }) => {
    const result = await messageDAO.setStateToReaded(
      data.senderId,
      data.reciverId
    );
    if (result) {
      return result;
    }
  };

  return {
    createNewOrUpdate,
    removeById,
    listenToChangesInDatabase,
    getNotReadedMessage,
    getAllUserContacts,
    getAllMessages,
    setStateToReaded,
  };
};

export default {
  operations,
};
