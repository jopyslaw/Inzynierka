import mongoose from "mongoose";
import { CategoryEnum } from "../shared/enums/category.enum";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import { AdvertisementDAO } from "../shared/models/advertisementDAO.model";
import { TutorOpinionDAO } from "../shared/models/tutorOpinionDAO.model";

const tutorOpinionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    rating: {
      type: String,
      required: true,
    },
  },
  {
    collection: "tutorOpinion",
  }
);

const TutorOpinionModel = mongoose.model<TutorOpinionDAO>(
  "tutorOpinion",
  tutorOpinionSchema
);

const createNewOrUpdate = (poster: AdvertisementDAO) => {
  return Promise.resolve()
    .then(() => {
      if (!poster.id) {
        return new TutorOpinionModel(poster).save().then((result) => {
          console.log(result);
          if (result) {
            return convert(result);
          }
        });
      } else {
        return TutorOpinionModel.findByIdAndUpdate(
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

const getById = async (id: string) => {
  const result = await TutorOpinionModel.findOne({ _id: id }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await TutorOpinionModel.findByIdAndRemove(id);
};

const getAllTutorOpinions = async (userId: string) => {
  const result = await TutorOpinionModel.find({ tutorId: userId }, null, {
    lean: "toObject",
  });
  if (result) {
    console.log(result);
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not found");
};

const getAllUserOpinions = async (userId: string) => {
  const result = await TutorOpinionModel.find({ userId: userId }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not exists");
};

export default {
  createNewOrUpdate,
  getById,
  removeById,
  getAllTutorOpinions,
  getAllUserOpinions,
  model: TutorOpinionModel,
};
