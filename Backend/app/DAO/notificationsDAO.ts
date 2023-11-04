import mongoose from "mongoose";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import moment from "moment";
import { NotificationDAO } from "../shared/models/notificationDAO.model";
import { NotificationTypeEnum } from "../shared/enums/notificationType.enum";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String },
    isReaded: { type: Boolean, required: true, default: false },
    dateTimeSend: { type: String, required: true, default: moment.now() },
    typeOfNotification: {
      type: String,
      enum: NotificationTypeEnum,
      required: true,
    },
  },
  {
    collection: "notification",
  }
);

const NotificationModel = mongoose.model<NotificationDAO>(
  "notification",
  notificationSchema
);

const createNewOrUpdate = (notification: NotificationDAO) => {
  return Promise.resolve()
    .then(() => {
      if (!notification.id) {
        return new NotificationModel(notification).save().then((result) => {
          console.log(result);
          if (result) {
            return convert(result);
          }
        });
      } else {
        return NotificationModel.findByIdAndUpdate(
          notification.id,
          _.omit(notification, "id"),
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
  const result = await NotificationModel.findOne({ _id: id }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await NotificationModel.findByIdAndRemove(id);
};

const getAllNotificationsNotReadedForUserId = async (userId: string) => {
  return await NotificationModel.find(
    {
      userId,
      isReaded: false,
      notificationType: NotificationTypeEnum.ADVERTISMENTS,
    },
    null,
    {
      lean: "toObject",
    }
  );
};

const getNotificationsForUserId = async (userId: string) => {
  return await NotificationModel.find(
    { userId, notificationType: NotificationTypeEnum.ADVERTISMENTS },
    null,
    { lean: "toObject" }
  );
};

const setNotificationToReadedState = async (notificationId: string) => {
  const result = await NotificationModel.findByIdAndUpdate(notificationId, {
    isReaded: true,
  });
  if (result) {
    return result;
  }
};

export default {
  createNewOrUpdate,
  getById,
  removeById,
  getAllNotificationsNotReadedForUserId,
  getNotificationsForUserId,
  setNotificationToReadedState,
  model: NotificationModel,
};