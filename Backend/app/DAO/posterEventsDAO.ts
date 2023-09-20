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

const createNewOrUpdate = (poster: PosterEventDAO) => {
  console.log("posterEvent", poster);
  return Promise.resolve()
    .then(() => {
      if (!poster.id) {
        console.log("new");
        return new PosterEventModel({
          ...poster,
          posterId: poster.posterId,
        })
          .save()
          .then((result) => {
            console.log(result);
            if (result) {
              return convert(result);
            }
          });
      } else {
        return PosterEventModel.findByIdAndUpdate(
          poster.id,
          _.omit(poster, "id"),
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

const getPosterById = async (id: string) => {
  const result = await PosterEventModel.findOne({ _id: id }, null, {
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

const getAllUserPosters = async (userId: string) => {
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
  getPosterById,
  removeById,
  getAllUserPosters,
  getAllPosters,
  model: PosterEventModel,
};
