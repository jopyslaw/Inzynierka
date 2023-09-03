import mongoose from "mongoose";
import { TokenType } from "../shared/enums/tokenType.enum";
import { TokenDAO } from "../shared/models/tokenDAO.model";
import { UserDAO } from "../shared/models/userDAO.model";
import jwt from "jsonwebtoken";
import config from "../config";
import { convert } from "../service/mongoConverter";
import { ErrorCodes, errorUtils } from "../service/applicationException";
import momentWrapper from "../service/momentWrapper";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    createDate: { type: Number, required: true },
    type: {
      type: String,
      enum: TokenType,
      required: "true",
    },
    value: { type: String, required: true },
  },
  {
    collection: "token",
  }
);

const TokenModel = mongoose.model<TokenDAO>("token", tokenSchema);

const create = async (user: UserDAO) => {
  const access = "auth";
  const userData = {
    userId: user.id,
    name: user.email,
    role: user.role,
    isAdmin: user.isAdmin,
    access: access,
  };
  const value = jwt.sign(userData, config.JwtSecret, {
    expiresIn: "3h",
  });
  const result = await new TokenModel({
    userId: user.id,
    type: "authorization",
    value: value,
    createDate: momentWrapper.get().valueOf(),
  }).save();
  if (result) {
    return convert(result);
  }
  throw errorUtils.new(ErrorCodes.BAD_REQUEST.code, "Can't create JWT token");
};

const get = async (tokenValue: string) => {
  const result = await TokenModel.findOne({ value: tokenValue });
  if (result) {
    return convert(result);
  }
  throw errorUtils.new(ErrorCodes.UNAUTHORIZED.code, "Token not found");
};

const remove = async (userId: string) => {
  return await TokenModel.deleteOne({ userId: userId });
};

export default {
  create,
  get,
  remove,
  model: TokenModel,
};
