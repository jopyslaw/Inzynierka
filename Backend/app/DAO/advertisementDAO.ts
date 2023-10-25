import mongoose from "mongoose";
import { CategoryEnum } from "../shared/enums/category.enum";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import { AdvertisementDAO } from "../shared/models/advertisementDAO.model";
import { PlaceEnum } from "../shared/enums/place.enum";
import moment from "moment";

const advertisementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: CategoryEnum,
      default: CategoryEnum.OTHERS,
    },
    description: { type: String },
    price: { type: String, required: true },
    place: {
      type: String,
      required: false,
      enum: PlaceEnum,
      default: PlaceEnum.TUTOR_PLACE,
    },
    meetingAddress: {
      type: String,
      required: false,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: "advertisement",
  }
);

const AdvertisementModel = mongoose.model<AdvertisementDAO>(
  "advertisement",
  advertisementSchema
);

const createNewOrUpdate = (poster: AdvertisementDAO) => {
  return Promise.resolve()
    .then(() => {
      if (!poster.id) {
        return new AdvertisementModel(poster).save().then((result) => {
          console.log(result);
          if (result) {
            return convert(result);
          }
        });
      } else {
        return AdvertisementModel.findByIdAndUpdate(
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
  const result = await AdvertisementModel.findOne({ _id: id }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await AdvertisementModel.findByIdAndRemove(id);
};

const getAllUserAdvertisement = async (userId: string) => {
  const result = await AdvertisementModel.find({ userId: userId }, null, {
    lean: "toObject",
  });
  if (result) {
    console.log(result);
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not found");
};

const getAllAdvertisements = async () => {
  const result = await AdvertisementModel.find({}, null, { lean: "toObject" });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Posters not exists");
};

export default {
  createNewOrUpdate,
  getById,
  removeById,
  getAllUserAdvertisement,
  getAllAdvertisements,
  model: AdvertisementModel,
};
