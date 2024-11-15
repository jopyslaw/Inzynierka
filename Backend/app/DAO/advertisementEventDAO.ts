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
    archived: { type: Boolean, required: true, default: false },
  },
  {
    collection: "advertisementEvent",
  }
);

const AdvertisementEventModel = mongoose.model<AdvertisementEventDAO>(
  "advertisementEvent",
  AdvertisementEventSchema
);

const createNewOrUpdate = async (advertisement: AdvertisementEventDAO[]) => {
  const result = await AdvertisementEventModel.insertMany(advertisement);

  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.BAD_REQUEST.code, "User not found");
};

const getAdvertisementEventById = async (id: string) => {
  const result = await AdvertisementEventModel.find(
    { advertisementId: id, archived: false },
    null,
    {
      lean: "toObject",
    }
  );
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await AdvertisementEventModel.findByIdAndUpdate(id, {
    archived: true,
  });
};

const removeByIds = async (ids: string[] | undefined) => {
  const result = await AdvertisementEventModel.updateMany(
    { _id: { $in: ids } },
    { $set: { archived: true } }
  );

  return result;
};

const getAllUserAdvertisementEvents = async (eventsIds: string[]) => {
  const result = await AdvertisementEventModel.find(
    { _id: { $in: eventsIds }, archived: false },
    null,
    { lean: "toObject" }
  );

  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "advertisements not found");
};

const getAllAdvertisement = async () => {
  const result = await AdvertisementEventModel.find({ archived: false }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "advertisements not exists");
};

const getAllAdvertisementEventsForAdvertismentIds = async (
  advertisementIds: string[]
) => {
  const result = await AdvertisementEventModel.find(
    { advertisementId: { $in: advertisementIds }, archived: false },
    null,
    { lean: "toObject" }
  );

  return result;
};

const getAllAdvertismentsForArray = async (ids: string[]) => {
  const result = await AdvertisementEventModel.find(
    { _id: { $in: ids }, archived: false },
    null,
    { lean: "toObject" }
  );

  return result;
};

const findById = async (id: string) => {
  const result = await AdvertisementEventModel.findOne(
    { _id: id, archvied: false },
    null,
    { lean: "toObject" }
  );

  return result;
};

export default {
  createNewOrUpdate,
  getAdvertisementEventById,
  removeById,
  getAllUserAdvertisementEvents,
  getAllAdvertisement,
  removeByIds,
  getAllAdvertisementEventsForAdvertismentIds,
  getAllAdvertismentsForArray,
  findById,
  model: AdvertisementEventModel,
};
