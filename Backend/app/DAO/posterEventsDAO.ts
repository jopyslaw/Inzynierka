import mongoose from "mongoose";
import { PosterEventDAO } from "../shared/models/posterEventDAO.model";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";

const posterEventsSchema = new mongoose.Schema(
  {
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "poster",
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
    collection: "posterEvent",
  }
);

const PosterEventModel = mongoose.model<PosterEventDAO>(
  "posterEvent",
  posterEventsSchema
);

const createNewOrUpdate = async (poster: PosterEventDAO[]) => {
  const result = await PosterEventModel.insertMany(poster);

  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.BAD_REQUEST.code, "User not found");
};

const getPosterEventById = async (id: string) => {
  const result = await PosterEventModel.find({ posterId: id }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await PosterEventModel.findByIdAndRemove(id);
};

const getAllUserPostersEvents = async (userId: string) => {
  const result = await PosterEventModel.find({ userId: userId }, null, {
    lean: "toObject",
  });
  if (result) {
    console.log(result);
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not found");
};

const getAllPosters = async () => {
  const result = await PosterEventModel.find({}, null, { lean: "toObject" });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not exists");
};

export default {
  createNewOrUpdate,
  getPosterEventById,
  removeById,
  getAllUserPostersEvents,
  getAllPosters,
  model: PosterEventModel,
};
