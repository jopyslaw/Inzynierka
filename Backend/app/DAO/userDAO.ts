import mongoose from "mongoose";
import { UserRole } from "../shared/enums/userRole.enum";
import { UserDAO } from "../shared/models/userDAO.model";
import * as _ from "lodash";
import { convert } from "../service/mongoConverter";
import {
  ApplicationException,
  ErrorCodes,
  errorUtils,
} from "../service/applicationException";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
      required: false,
    },
    active: { type: Boolean, default: true, required: false },
    isAdmin: { type: Boolean, default: false, required: false },
    phoneNumber: { type: String, required: true, unique: true },
  },
  {
    collection: "user",
  }
);

//userSchema.plugin()

const UserModel = mongoose.model<UserDAO>("user", userSchema);

const createNewOrUpdate = (user: UserDAO) => {
  return Promise.resolve()
    .then(() => {
      if (!user.id) {
        return new UserModel(user).save().then((result) => {
          if (result) {
            return convert(result);
          }
        });
      } else {
        return UserModel.findByIdAndUpdate(user.id, _.omit(user, "id"), {
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

const getByEmailOrLogin = async (login: string) => {
  const result = await UserModel.findOne({
    $or: [{ email: login }, { login: login }],
  });

  if (result) {
    return convert(result);
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const get = async (id: string) => {
  const result = await UserModel.findOne({ _id: id });

  if (result) {
    return convert(result);
  }

  throw errorUtils.new(ErrorCodes.NOT_FOUND.code, "User not found");
};

const removeById = async (id: string) => {
  return await UserModel.findByIdAndRemove(id);
};

export default {
  createNewOrUpdate,
  getByEmailOrLogin,
  get,
  removeById,
  model: UserModel,
};
