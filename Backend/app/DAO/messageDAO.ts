import mongoose from "mongoose";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import { MessageDAO } from "../shared/models/messageDAO.model";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reciverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String },
    content: { type: String, required: true },
    isReaded: { type: Boolean, required: true, default: false },
    dateTimeSend: {
      type: String,
      required: true,
    },
  },
  {
    collection: "message",
  }
);

const MessageModel = mongoose.model<MessageDAO>("message", messageSchema);

const createNewOrUpdate = (message: MessageDAO) => {
  return Promise.resolve()
    .then(() => {
      if (!message.id) {
        return new MessageModel(message).save().then((result) => {
          if (result) {
            return convert(result);
          }
        });
      } else {
        return MessageModel.findByIdAndUpdate(
          message.id,
          _.omit(message, "id"),
          {
            new: true,
          }
        );
      }
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        error = error.errors[Object.keys(error.errors)[0]];
        throw errorUtils.new(ErrorCodes.BAD_REQUEST.code, error.message);
      }
      throw error;
    });
};

const getById = async (id: string) => {
  const result = await MessageModel.findOne({ _id: id }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await MessageModel.findByIdAndRemove(id);
};

const getAllMessagesNotReadedForUserId = async (userId: string) => {
  return await MessageModel.find({ reciverId: userId, isReaded: false }, null, {
    lean: "toObject",
  });
};

const getAllUserContacts = async (userId: string) => {
  const result = await MessageModel.find(
    {
      $or: [{ senderId: userId }, { reciverId: userId }],
    },
    "senderId reciverId",
    { lean: "toObject" }
  );

  const uniqueIds = result.map((id) => {
    if (id.reciverId.toString() !== userId) {
      return id.reciverId;
    } else if (id.senderId.toString() !== userId) {
      return id.senderId;
    }
  });

  if (uniqueIds.length) {
    return uniqueIds;
  }
  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const getAllMessages = async (senderId: string, reciverId: string) => {
  const senderMessages = await MessageModel.find(
    {
      senderId: senderId,
      reciverId: reciverId,
    },
    null,
    { lean: "toObject" }
  );
  const reciverMessages = await MessageModel.find(
    {
      senderId: reciverId,
      reciverId: senderId,
    },
    null,
    { lean: "toObject" }
  );

  const allMessages = [...senderMessages, ...reciverMessages];

  const sortedAllMessages = allMessages.sort((a: any, b: any) => {
    return a.dateTimeSend.localeCompare(b.dateTimeSend);
  });

  if (sortedAllMessages) {
    return sortedAllMessages;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const setStateToReaded = async (senderId: string, reciverId: string) => {
  const result = await MessageModel.updateMany(
    { senderId: reciverId, reciverId: senderId, isReaded: false },
    { $set: { isReaded: true } }
  );

  return result;
};

export default {
  createNewOrUpdate,
  getById,
  removeById,
  getAllMessagesNotReadedForUserId,
  getAllUserContacts,
  getAllMessages,
  setStateToReaded,
  model: MessageModel,
};
