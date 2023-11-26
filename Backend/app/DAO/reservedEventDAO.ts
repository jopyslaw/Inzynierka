import mongoose from "mongoose";
import { ReservedAdvertisementEventDAO } from "../shared/models/reservedAdvertisementEventDAO.model";
import { convert } from "../service/mongoConverter";
import * as _ from "lodash";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import { error } from "console";

const ReservedEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    advertisementEventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "advertisementEvent",
      required: true,
      unique: true,
    },
    reserved: { type: Boolean, default: true, required: true },
  },
  {
    collection: "advertisementReservedEvent",
  }
);

const ReservedEventModel = mongoose.model<ReservedAdvertisementEventDAO>(
  "advertisementReservedEvent",
  ReservedEventSchema
);

const createNewOrUpdate = async (
  reservedData: ReservedAdvertisementEventDAO
) => {
  if (reservedData.tutorId === reservedData.userId) {
    throw errorUtils.new(
      ErrorCodes.CONFLICT.code,
      "Tutor cant reserve his own advertisement"
    );
  }
  return Promise.resolve()
    .then(() => {
      if (!reservedData.id) {
        return new ReservedEventModel(reservedData)
          .save()
          .then((result: any) => {
            if (result) {
              return convert(result);
            }
          });
      } else {
        return ReservedEventModel.findByIdAndUpdate(
          reservedData.id,
          _.omit(reservedData, "id"),
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

const removeById = async (id: string) => {
  return await ReservedEventModel.findByIdAndRemove(id);
};

const getReservationById = async (id: string) => {
  const result = await ReservedEventModel.findOne({ _id: id }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const getAllReservationForTutor = async (tutorId: string) => {
  const result = await ReservedEventModel.find({ tutorId: tutorId }, null, {
    lean: "toObject",
  });
  if (result) {
    return result;
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const getAllReservationForAdvertisementId = async (eventsIds: string[]) => {
  const result = await ReservedEventModel.find(
    { advertisementEventId: { $in: eventsIds } },
    null,
    {
      lean: "toObject",
    }
  );

  if (result) {
    return result;
  }
};

const getAllReservationsForUserId = async (userId: string) => {
  const result = await ReservedEventModel.find({ userId: userId }, null, {
    lean: "toObject",
  });

  if (result) {
    return result;
  }
};

export default {
  createNewOrUpdate,
  getReservationById,
  removeById,
  getAllReservationForTutor,
  getAllReservationForAdvertisementId,
  getAllReservationsForUserId,
  model: ReservedEventModel,
};
