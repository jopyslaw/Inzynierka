import mongoose from "mongoose";
import { AdvertisementEventDAO } from "../shared/models/advertisementEventDAO.model";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import reservedEventModel from "./reservedEventDAO";

const AdvertisementEventSchema = new mongoose.Schema(
  {
    advertisementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "advertisement",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    allDay: { type: Boolean, required: true, default: false },
  },
  {
    collection: "advertisementEvent",
  }
);

const AdvertisementEventModel = mongoose.model<AdvertisementEventDAO>(
  "advertisementEvent",
  AdvertisementEventSchema
);

const createNewOrUpdate = async (poster: AdvertisementEventDAO[]) => {
  const result = await AdvertisementEventModel.insertMany(poster);

  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.BAD_REQUEST.code, "User not found");
};

const getPosterEventById = async (id: string) => {
  const result = await AdvertisementEventModel.find({ posterId: id }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await AdvertisementEventModel.findByIdAndRemove(id);
};

const getAllUserPostersEvents = async (userId: string) => {
  const result = await AdvertisementEventModel.find({ userId: userId }, null, {
    lean: "toObject",
  });
  if (result) {
    console.log(result);
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not found");
};

const getAllPosters = async () => {
  const result = await AdvertisementEventModel.find({}, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not exists");
};

const getAllPosterWithIds = async (eventIds: string[]) => {
  const result = await AdvertisementEventModel.find(
    { _id: { $in: eventIds } },
    null,
    {
      lean: "toObject",
    }
  );

  if (result) {
    return result;
  }
};

export default {
  createNewOrUpdate,
  getPosterEventById,
  removeById,
  getAllUserPostersEvents,
  getAllPosters,
  getAllPosterWithIds,
  model: AdvertisementEventModel,
};
