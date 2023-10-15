import mongoose from "mongoose";
import { CategoryEnum } from "../shared/enums/category.enum";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import { AdvertisementDAO } from "../shared/models/advertisementDAO.model";
import { TutorOpinionDAO } from "../shared/models/tutorOpinionDAO.model";
import moment from "moment";
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
    title: { type: String, required: true },
    content: { type: String },
    isReaded: { type: Boolean, required: true, default: false },
    dateTimeSend: { type: String, required: true, default: moment.now() },
  },
  {
    collection: "message",
  }
);

const MessageModel = mongoose.model<MessageDAO>("message", messageSchema);

const createNewOrUpdate = (poster: MessageDAO) => {
  return Promise.resolve()
    .then(() => {
      if (!poster.id) {
        return new MessageModel(poster).save().then((result) => {
          console.log(result);
          if (result) {
            return convert(result);
          }
        });
      } else {
        return MessageModel.findByIdAndUpdate(poster.id, _.omit(poster, "id"), {
          new: true,
        });
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

export default {
  createNewOrUpdate,
  getById,
  removeById,
  model: MessageModel,
};
