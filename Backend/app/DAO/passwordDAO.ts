import mongoose from "mongoose";
import { PasswordDAO } from "../shared/models/passwordDAO.model";
import * as _ from "lodash";
import { convert } from "../service/mongoConverter";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import bcrypt from "bcrypt";

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
    _.omit(data, "id, userId"),
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
  });
  if (result && convert(result)) {
    const check = await bcrypt.compare(password, result.password);
    if (check) {
      return true;
    }
    throw errorUtils.new(
      ErrorCodes.UNAUTHORIZED.code,
      "User and password does not match"
    );
  }
  console.log("XD");
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
