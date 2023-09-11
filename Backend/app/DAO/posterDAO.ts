import mongoose from "mongoose";
import { CategoryEnum } from "../shared/enums/category.enum";
import { PosterDAO } from "../shared/models/posterDAO.model";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";

const posterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    category: { type: String, enum: CategoryEnum, required: true },
    description: { type: String },
    price: { type: String, required: true },
    events: [],
  },
  {
    collection: "poster",
  }
);

const PosterModel = mongoose.model<PosterDAO>("poster", posterSchema);

const createNewOrUpdate = (poster: PosterDAO) => {
  return Promise.resolve()
    .then(() => {
      if (poster.id) {
        return new PosterModel(poster).save().then((result) => {
          if (result) {
            return convert(result);
          }
        });
      } else {
        return PosterModel.findByIdAndUpdate(poster.id, _.omit(poster, "id"), {
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

const getPosterById = async (id: string) => {
  const result = await PosterModel.findOne({ _id: id });
  if (result) {
    return convert(result);
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await PosterModel.findByIdAndRemove(id);
};

const getAllUserPosters = async (userId: string) => {
  const result = await PosterModel.find({ userId: userId });
  if (result) {
    return convert(result);
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not found");
};

export default {
  createNewOrUpdate,
  getPosterById,
  removeById,
  getAllUserPosters,
  model: PosterModel,
};
