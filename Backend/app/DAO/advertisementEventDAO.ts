import mongoose from "mongoose";
import { AdvertisementEventDAO } from "../shared/models/advertisementEventDAO.model";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";

const AdvertisementEventSchema = new mongoose.Schema(
  {
    advertisementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "advertisement",
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

const getAdvertisementEventById = async (id: string) => {
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

const getAllUserAdvertisementEvents = async (eventsIds: string[]) => {
  const result = await AdvertisementEventModel.find(
    { advertisementId: { $in: eventsIds } },
    null,
    { lean: "toObject" }
  );

  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not found");
};

const getAllAdvertisement = async () => {
  const result = await AdvertisementEventModel.find({}, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not exists");
};

const getAllAdvertisementWithIds = async (eventIds: string[]) => {
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
  getAdvertisementEventById,
  removeById,
  getAllUserAdvertisementEvents,
  getAllAdvertisement,
  getAllAdvertisementWithIds,
  model: AdvertisementEventModel,
};
