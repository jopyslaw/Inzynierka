import mongoose from "mongoose";
import { PasswordDAO } from "../shared/models/passwordDAO.model";
import * as _ from "lodash";
import { convert } from "../service/mongoConverter";
import { ErrorCodes, errorUtils } from "../service/applicationException";

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
  },
  {
    collection: "password",
  }
);

const PasswordModel = mongoose.model("password", passwordSchema);

const createOrUpdate = async (data: PasswordDAO) => {
  const result = await PasswordModel.findOneAndUpdate(
    { userId: data.userId },
    _.omit(data, "id"),
    { new: true }
  );
  if (!result) {
    const result = await new PasswordModel({
      userId: data.userId,
      password: data.password,
    }).save();
    if (result) {
      return convert(result);
    }
  }
  return result;
};

const authorize = async (userId: string, password: string) => {
  const result = await PasswordModel.findOne({
    userId: userId,
    password: password,
  });
  console.log(result);
  if (result && convert(result)) {
    return true;
  }
  throw errorUtils.new(
    ErrorCodes.UNAUTHORIZED.code,
    "User and password does not match"
  );
};

export default {
  createOrUpdate,
  authorize,
  model: PasswordModel,
};
