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
    archived: {
      type: Boolean,
      required: true,
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

const createNewOrUpdate = (advertisement: AdvertisementDAO) => {
  return Promise.resolve()
    .then(() => {
      if (!advertisement.id) {
        return new AdvertisementModel(advertisement).save().then((result) => {
          if (result) {
            return convert(result);
          }
        });
      } else {
        return AdvertisementModel.findByIdAndUpdate(
          advertisement.id,
          _.omit(advertisement, "id"),
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
  return await AdvertisementModel.findByIdAndUpdate(id, { archived: true });
};

const getAllUserAdvertisement = async (userId: string) => {
  const result = await AdvertisementModel.find(
    { userId: userId, archived: false },
    null,
    {
      lean: "toObject",
    }
  );
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "advertisements not found");
};

const getAllAdvertistmentsFromArray = async (ids: string[]) => {
  const result = await AdvertisementModel.find(
    { _id: { $in: ids }, archived: false },
    null,
    { lean: "toObject" }
  );

  return result;
};

const getAllAdvertisements = async () => {
  const result = await AdvertisementModel.find({ archived: false }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "advertisements not exists");
};

const getAllInActiveAndNotArchivedAdvertisments = async () => {
  const result = await AdvertisementModel.find(
    { isActive: false, archived: false },
    null,
    { lean: "toObject" }
  );
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Advertisments not found");
};

const activateAdvertisments = async (advertismentsIds: string[]) => {
  const filter = { id: { $in: advertismentsIds } };
  const update = { $set: { isActive: true } };

  const result = await AdvertisementModel.updateMany(filter, update);

  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Nothing was updated");
};

const deactivateAdvertisments = async (advertismentsIds: string[]) => {
  const filter = { id: { $in: advertismentsIds } };
  const update = { $set: { isActive: true, archived: true } };

  const result = await AdvertisementModel.updateMany(filter, update);

  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "Nothing was updated");
};

const getAllActiveAndNotArchivedAdvertismentsForTutor = async (
  userId: string
) => {
  return await AdvertisementModel.find(
    { userId, isActive: true, archived: false },
    null,
    { lean: "toObject" }
  );
};

export default {
  createNewOrUpdate,
  getById,
  removeById,
  getAllUserAdvertisement,
  getAllAdvertisements,
  getAllInActiveAndNotArchivedAdvertisments,
  activateAdvertisments,
  deactivateAdvertisments,
  getAllActiveAndNotArchivedAdvertismentsForTutor,
  getAllAdvertistmentsFromArray,
  model: AdvertisementModel,
};
